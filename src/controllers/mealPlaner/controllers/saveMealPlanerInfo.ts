// Формат даты для всего проекта --- 2021-12-29
// Показать дату в мс --- new Date('2021-12-29').getTime() / 1000
// Текущая дата --- new Date().toJSON().split('T')[0]

import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import { MealPlaners } from "../../../db/entities/MealPlaners"
import { UsersParams } from "../../../db/entities/UsersParams"

export const saveMealPlanerInfo = async (req: Request, res: Response): Promise<Response> => {
  try {
    console.log(req.body.mealPlanerInfo)

    const response = {
      data: null
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
