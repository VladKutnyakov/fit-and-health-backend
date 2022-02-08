import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { Muscles } from "../../../db/entities/Muscles"

export const fetchMuscles = async (req: Request, res: Response): Promise<Response> => {
  try {
    const MusclesList = await getRepository(Muscles)
      .createQueryBuilder('muscles')
      .select(['muscles.id', 'muscles.title'])
      .orderBy('id')
      .getMany()
    // console.log(ExercisesList)

    const response = {
      updatedToken: req.body.updatedToken,
      data: MusclesList
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      updatedToken: req.body.updatedToken,
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
