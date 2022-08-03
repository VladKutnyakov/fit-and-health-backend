import { Request, Response } from "express"
import { dataSource } from '@/dataSource'
import { ExerciseSorts } from "@/db/entities/ExerciseSorts"

export const fetchExerciseSorts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ExerciseSortsList = await dataSource.getRepository(ExerciseSorts)
      .createQueryBuilder('exerciseSorts')
      .orderBy('id')
      .getMany()
    // console.log(ExercisesList)

    return res.status(200).json(ExerciseSortsList)
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
