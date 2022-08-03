import { Request, Response } from "express"
import { dataSource } from '@/dataSource'
import { Muscles } from "@/db/entities/Muscles"

export const fetchMuscles = async (req: Request, res: Response): Promise<Response> => {
  try {
    const MusclesList = await dataSource.getRepository(Muscles)
      .createQueryBuilder('muscles')
      .select(['muscles.id', 'muscles.title'])
      .orderBy('id')
      .getMany()
    // console.log(ExercisesList)

    return res.status(200).json(MusclesList)
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
