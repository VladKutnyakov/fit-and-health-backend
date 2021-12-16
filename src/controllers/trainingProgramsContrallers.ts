import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { TrainingPrograms } from "../db/entities/TrainingPrograms"

const getTrainingPrograms = async (req: Request, res: Response): Promise<Response> => {
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

const getTrainingProgramInfo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const TrainingProgramInfo = await getRepository(TrainingPrograms)
      .createQueryBuilder('trainingProgram')
      .select([
        'trainingProgram.id',
        'trainingProgram.title',
        'trainingProgram.description'
      ])
      .where([{id: req.params.trainingProgramId}])
      .leftJoinAndSelect("trainingProgram.trainingProgramDays", "trainingProgramDays")
      .leftJoinAndSelect('trainingProgramDays.trainingProgramDayExercises', 'trainingProgramDayExercises')
      .leftJoinAndSelect('trainingProgramDayExercises.exercise', 'exercise')
      .leftJoinAndSelect('trainingProgram.skill', 'skill')
      .leftJoinAndSelect('trainingProgram.marks', 'marks')
      .leftJoin("trainingProgram.user", "user")
      .addSelect(['user.id'])
      .getOne()
    // console.log(TrainingProgramInfo?.trainingProgramDays[0])

    const response = {
      updatedToken: req.body.updatedToken,
      data: TrainingProgramInfo
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      updatedToken: req.body.updatedToken,
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}

export default {
  getTrainingPrograms,
  getTrainingProgramInfo
}
