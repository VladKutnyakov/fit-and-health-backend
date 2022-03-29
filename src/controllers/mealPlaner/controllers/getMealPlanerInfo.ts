// Формат даты для всего проекта --- 2021-12-29
// Показать дату в мс --- new Date('2021-12-29').getTime() / 1000
// Текущая дата --- new Date().toJSON().split('T')[0]

import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import { MealPlaners } from "../../../db/entities/MealPlaners"
import { UsersParams } from "../../../db/entities/UsersParams"

export const getMealPlanerInfo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const targetDate = req.query.date || new Date().toJSON().split('T')[0]
    // console.log(targetDate)

    // Найти план питания для укзанной даты или для текущего дня если дата не передана в запросе
    const MealPlanerInfo = await dataSource.getRepository(MealPlaners)
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
    // console.log(MealPlanerInfo)
    // console.log(MealPlanerInfo?.user.params)
    // console.log(MealPlanerInfo?.mealParts[0].mealPartProducts)

    // Если план питания не найден возвращается объект с начальными данными
    const EmptyMealPlanerInfo: any = {
      id: null,
      date: new Date().toJSON().split('T')[0],
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
          mealPartProducts: [],
          mealPartRecipes: []
        },
      ],
      user: {
        id: req.body.userId,
        params: [
          {
            weight: null,
            targetWeight: null
          }
        ]
      }
    }
    // console.log(EmptyMealPlanerInfo)

    // Если план питания для нужной даты не найден, получить послдение данные о "Текущем весе" и "Желаемом весе" пользователя
    if (!MealPlanerInfo) {
      const UserParams = await dataSource.getRepository(UsersParams)
        .createQueryBuilder('userParams')
        .where([{user: req.body.userId}])
        .orderBy('id', 'DESC')
        .getOne()
      // console.log(UserParams)

      EmptyMealPlanerInfo.user.params[0].targetWeight = UserParams?.targetWeight || null
      EmptyMealPlanerInfo.user.params[0].weight = UserParams?.weight || null
    }

    const response = {
      data: MealPlanerInfo || EmptyMealPlanerInfo
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
