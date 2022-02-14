import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { ExerciseTypes } from "../../../db/entities/ExerciseTypes"

export const fetchExerciseTypes = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ExerciseTypesList = await getRepository(ExerciseTypes)
      .createQueryBuilder('exerciseTypes')
      .orderBy('id')
      .getMany()
    // console.log(ExercisesList)

    const response = {
      data: ExerciseTypesList
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
