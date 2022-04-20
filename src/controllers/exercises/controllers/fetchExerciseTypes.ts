import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import { ExerciseTypes } from "../../../db/entities/ExerciseTypes"

export const fetchExerciseTypes = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ExerciseTypesList = await dataSource.getRepository(ExerciseTypes)
      .createQueryBuilder('exerciseTypes')
      .orderBy('id')
      .getMany()
    // console.log(ExercisesList)

    return res.status(200).json(ExerciseTypesList)
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
