import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { ExerciseSorts } from "../../../db/entities/ExerciseSorts"

export const fetchExerciseSorts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ExerciseSortsList = await getRepository(ExerciseSorts)
      .createQueryBuilder('exerciseSorts')
      .orderBy('id')
      .getMany()
    // console.log(ExercisesList)

    const response = {
      updatedToken: req.body.updatedToken,
      data: ExerciseSortsList
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      updatedToken: req.body.updatedToken,
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
