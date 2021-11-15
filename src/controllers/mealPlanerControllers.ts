// Формат даты для всего проекта --- 2021-12-29
// Показать дату в мс --- new Date('2021-12-29').getTime() / 1000
// Текущая дата --- new Date().toJSON().split('T')[0]

import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { MealPlaners } from "../db/entities/MealPlaners"
import { UsersParams } from "../db/entities/UsersParams"

const getMealPlanerInfo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const targetDate = req.query.date || new Date().toJSON().split('T')[0]
    // console.log(targetDate)

    // Найти план питания для укзанной даты или для текущего дня если дата не передана в запросе
    const MealPlanerInfo = await getRepository(MealPlaners)
      .createQueryBuilder('mealPlaners')
      .where([{user: req.body.userId, date: targetDate}])
      .leftJoin("mealPlaners.user", "user")
      .addSelect(['user.id'])
      .leftJoinAndSelect("mealPlaners.mealParts", "mealParts") // ПОДЗАПРОС для получения списка продуктов ?
      .getOne()
    console.log(MealPlanerInfo)

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
      like: null,
      dislike: null,
      share: null,
      mealParts: [
        {
          id: null,
          title: 'Затрак',
          mealTime: '07:00',
          recipes: [],
          products: []
        },
      ],
      user: {
        id: req.body.userId
      }
    }
    // console.log(EmptyMealPlanerInfo)

    // Если план питания для нужной даты не найден, получить послдение данные о "Текущем весе" и "Желаемом весе" пользователя
    if (!MealPlanerInfo) {
      const UserParams = await getRepository(UsersParams)
        .createQueryBuilder('userParams')
        .where([{user: req.body.userId}])
        .orderBy('id', 'DESC')
        .getOne()
      // console.log(UserParams)

      EmptyMealPlanerInfo.targetWeight = UserParams?.targetWeight || null
      EmptyMealPlanerInfo.currentWeight = UserParams?.weight || null
    }

    const test = {
      ...MealPlanerInfo,
      marks: [],
      like: null,
      dislike: null,
      share: null,
      mealParts: [
        {
          id: null,
          title: 'Затрак',
          mealTime: '07:00',
          recipes: [],
          products: []
        },
      ],
    }

    const response = {
      updatedToken: req.body.updatedToken,
      data: MealPlanerInfo ? test : EmptyMealPlanerInfo
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      updatedToken: req.body.updatedToken,
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}

export default {
  getMealPlanerInfo
}
