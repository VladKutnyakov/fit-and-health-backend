import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { ExerciseEquipments } from "../../../db/entities/ExerciseEquipments"

export const fetchExerciseEquipments = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ExerciseEquipmentsList = await getRepository(ExerciseEquipments)
      .createQueryBuilder('exerciseEquipments')
      .orderBy('id')
      .getMany()
    // console.log(ExercisesList)

    const response = {
      data: ExerciseEquipmentsList
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
