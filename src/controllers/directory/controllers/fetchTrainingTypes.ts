import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import { TrainingTypes } from "../../../db/entities/TrainingTypes"

export const fetchTrainingTypes = async (req: Request, res: Response): Promise<Response> => {
  try {
    const TrainingTypesList = await dataSource.getRepository(TrainingTypes)
      .createQueryBuilder('trainingTypes')
      .orderBy('id')
      .getMany()
    // console.log(TrainingTypesList)

    const response = {
      data: TrainingTypesList
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
