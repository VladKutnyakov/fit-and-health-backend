import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import { TrainingPrograms } from "../../../db/entities/TrainingPrograms"

export const fetchTrainingProgramsList = async (req: Request, res: Response): Promise<Response> => {
  try {
    const TrainingProgramsList = await dataSource.getRepository(TrainingPrograms)
      .createQueryBuilder('trainingPrograms')
      .where("trainingPrograms.user = :id OR trainingPrograms.user IS NULL", { id: req.body.userId })
      .leftJoin("trainingPrograms.user", "user")
      .addSelect(['user.id'])
      .offset(0)
      .limit(10)
      .orderBy({'trainingPrograms.id': 'ASC'})
      .getMany()
    // console.log(TrainingProgramsList)

    const response = {
      data: TrainingProgramsList
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
