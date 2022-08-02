import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import { MealPlaners } from "../../../db/entities/MealPlaners"
import { UsersParams } from "../../../db/entities/UsersParams"

export const saveMealPlanerInfo = async (req: Request, res: Response): Promise<Response> => {
  try {
    console.log(req.body.mealPlanerInfo)

    return res.status(200).json(req.body.mealPlanerInfo)
  } catch (error: any) {
    return res.status(500).json({
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
