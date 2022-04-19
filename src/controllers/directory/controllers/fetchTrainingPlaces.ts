import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import { TrainingPlaces } from "../../../db/entities/TrainingPlaces"

export const fetchTrainingPlaces = async (req: Request, res: Response): Promise<Response> => {
  try {
    const TrainingPlacesList = await dataSource.getRepository(TrainingPlaces)
      .createQueryBuilder('trainingPlaces')
      .orderBy('id')
      .getMany()
    // console.log(TrainingTypesList)

    return res.status(200).json(TrainingPlacesList)
  } catch (error: any) {
    return res.status(500).json({
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
