// Формат даты для всего проекта --- 2021-12-29
// Показать дату в мс --- new Date('2021-12-29').getTime() / 1000
// Текущая дата --- new Date().toJSON().split('T')[0]

import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import { MealPlaners } from "../../../db/entities/MealPlaners"
import { UsersParams } from "../../../db/entities/UsersParams"

export const fetchMealPlanerInfo = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Если план питания не найден возвращается объект с начальными данными
    const MealPlanerInfo: any = {
      id: null,
      date: new Date().toLocaleString('ru-RU').split(',')[0],
      title: null,
      description: null,
      targetProtein: 1,
      targetFats: 0.5,
      targetCarb: 2,
      targetWeight: null,
      currentWeight: null,
      marks: [],
      mealParts: [
        {
          id: null,
          title: 'Затрак',
          mealTime: '07:00',
          mealPartProducts: [
            // {
            //   weightInMealPart: 145,
            //   product: {
            //     id: 21,
            //     title: "3245",
            //     weight: 100,
            //     protein: 50,
            //     fats: 2,
            //     carb: 3,
            //     kkal: 45
            //   }
            // }
          ],
          mealPartRecipes: [],
        },
      ],
      user: req.body.userId || null,
    }
    // console.log(MealPlanerInfo)

    if (req.body.userId) {
      const targetDate = req.query.date || new Date().toLocaleString('ru-RU').split(',')[0]
      // console.log(targetDate)

      // Найти план питания для укзанной даты или для текущего дня если дата не передана в запросе
      const FoundedMealPlanerInfo = await dataSource.getRepository(MealPlaners)
        .createQueryBuilder('mealPlaners')
        .where([{user: req.body.userId, date: targetDate}])
        .select([
          'mealPlaners.id',
          'mealPlaners.date',
          'mealPlaners.title',
          'mealPlaners.description',
          'mealPlaners.targetProtein',
          'mealPlaners.targetCarb',
          'mealPlaners.targetFats'
        ])
        .leftJoinAndSelect("mealPlaners.mealParts", "mealParts")
        .leftJoin("mealParts.mealPartProducts", "mealPartProducts")
        .addSelect(['mealPartProducts.weightInMealPart'])
        .leftJoin('mealPartProducts.product', 'product')
        .addSelect([
          'product.id',
          'product.title',
          'product.weight',
          'product.protein',
          'product.fats',
          'product.carb',
          'product.kkal'
        ])
        .leftJoinAndSelect('mealParts.mealPartRecipes', 'mealPartRecipes')
        .leftJoinAndSelect('mealPlaners.marks', 'marks')
        .leftJoin("mealPlaners.user", "user")
        .addSelect(['user.id'])
        .leftJoin('user.params', 'params', `params.id = (SELECT id FROM "users_params" WHERE "date" = '${targetDate}')`)
        .addSelect(['params.weight', 'params.targetWeight'])
        .getOne()
        // .getSql()
      // console.log(FoundedMealPlanerInfo)
      // console.log(FoundedMealPlanerInfo?.user.params)
      // console.log(FoundedMealPlanerInfo?.mealParts[0].mealPartProducts)

      // Если план питания для нужной даты не найден, получить послдение данные о "Текущем весе" и "Желаемом весе" пользователя
      if (FoundedMealPlanerInfo) {
        MealPlanerInfo.id = FoundedMealPlanerInfo.id,
        MealPlanerInfo.date = FoundedMealPlanerInfo.date,
        MealPlanerInfo.title = FoundedMealPlanerInfo.title,
        MealPlanerInfo.description = FoundedMealPlanerInfo.description,
        MealPlanerInfo.targetProtein = FoundedMealPlanerInfo.targetProtein,
        MealPlanerInfo.targetFats = FoundedMealPlanerInfo.targetFats,
        MealPlanerInfo.targetCarb = FoundedMealPlanerInfo.targetCarb,
        // MealPlanerInfo.marks = FoundedMealPlanerInfo.marks,
        MealPlanerInfo.mealParts = FoundedMealPlanerInfo.mealParts,
        MealPlanerInfo.user = {
          id: FoundedMealPlanerInfo.user.id,
        }
      }

      const LastUserParams = await dataSource.getRepository(UsersParams)
        .createQueryBuilder('userParams')
        .where([{user: req.body.userId}])
        .orderBy('id', 'DESC')
        .getOne()
      // console.log(LastUserParams)

      MealPlanerInfo.targetWeight = LastUserParams?.targetWeight || null
      MealPlanerInfo.currentWeight = LastUserParams?.weight || null

      return res.status(200).json(MealPlanerInfo)
    } else {
      return res.status(200).json(MealPlanerInfo)
    }
  } catch (error: any) {
    return res.status(500).json({
      errors: [
        {
          field: null,
          errorMessage: 'Неизвестная ошибка.'
        }
      ]
    })
  }
}
