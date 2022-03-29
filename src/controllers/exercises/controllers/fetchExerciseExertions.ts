import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import { ExerciseExertions } from "../../../db/entities/ExerciseExertions"

export const fetchExerciseExertions = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ExerciseExertionsList = await dataSource.getRepository(ExerciseExertions)
      .createQueryBuilder('exerciseExertions')
      .orderBy('id')
      .getMany()
    // console.log(ExercisesList)

    const response = {
      data: ExerciseExertionsList
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
