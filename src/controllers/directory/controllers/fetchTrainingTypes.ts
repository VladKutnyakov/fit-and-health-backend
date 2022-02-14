import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { TrainingTypes } from "../../../db/entities/TrainingTypes"

export const fetchTrainingTypes = async (req: Request, res: Response): Promise<Response> => {
  try {
    const TrainingTypesList = await getRepository(TrainingTypes)
      .createQueryBuilder('trainingTypes')
      .orderBy('id')
      .getMany()
    // console.log(TrainingTypesList)

    const response = {
      updatedToken: req.body.updatedToken,
      data: TrainingTypesList
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      updatedToken: req.body.updatedToken,
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
