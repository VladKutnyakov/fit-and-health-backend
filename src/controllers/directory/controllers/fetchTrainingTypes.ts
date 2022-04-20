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

    return res.status(200).json(TrainingTypesList)
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
