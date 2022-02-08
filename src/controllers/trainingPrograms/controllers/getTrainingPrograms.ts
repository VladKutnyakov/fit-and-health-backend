import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { TrainingPrograms } from "../../../db/entities/TrainingPrograms"

export const getTrainingPrograms = async (req: Request, res: Response): Promise<Response> => {
  try {
    const TrainingProgramsList = await getRepository(TrainingPrograms)
      .createQueryBuilder('trainingPrograms')
      .where([{user: req.body.userId}, {user: null}])
      .leftJoin("trainingPrograms.user", "user")
      .addSelect(['user.id'])
      .offset(0)
      .limit(10)
      .orderBy({'trainingPrograms.id': 'ASC'})
      .getMany()
    // console.log(TrainingProgramsList)

    const response = {
      updatedToken: req.body.updatedToken,
      data: TrainingProgramsList
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      updatedToken: req.body.updatedToken,
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
