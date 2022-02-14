import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { ExerciseExertions } from "../../../db/entities/ExerciseExertions"
import { ExerciseEquipments } from "../../../db/entities/ExerciseEquipments"

export const fetchExerciseExertions = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ExerciseExertionsList = await getRepository(ExerciseExertions)
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
