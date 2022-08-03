import { Request, Response } from "express"
import { dataSource } from '@/dataSource'
import { ExerciseEquipments } from "@/db/entities/ExerciseEquipments"

export const fetchExerciseEquipments = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ExerciseEquipmentsList = await dataSource.getRepository(ExerciseEquipments)
      .createQueryBuilder('exerciseEquipments')
      .orderBy('id')
      .getMany()
    // console.log(ExercisesList)

    return res.status(200).json(ExerciseEquipmentsList)
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
