import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import { ExerciseSorts } from "../../../db/entities/ExerciseSorts"

export const fetchExerciseSorts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ExerciseSortsList = await dataSource.getRepository(ExerciseSorts)
      .createQueryBuilder('exerciseSorts')
      .orderBy('id')
      .getMany()
    // console.log(ExercisesList)

    const response = {
      data: ExerciseSortsList
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
