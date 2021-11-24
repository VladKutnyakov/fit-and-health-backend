import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { TrainingPrograms } from "../db/entities/TrainingPrograms"

const getTrainingProgramInfo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const TrainingProgramInfo = await getRepository(TrainingPrograms)
      .createQueryBuilder('trainingProgram')
      .where([{id: req.params.trainingProgramId}])
      .leftJoinAndSelect("trainingProgram.trainingProgramDays", "trainingProgramDays")
      .leftJoinAndSelect('trainingProgramDays.trainingProgramDayExercises', 'trainingProgramDayExercises')
      .leftJoinAndSelect('trainingProgramDayExercises.exercise', 'exercise')
      .leftJoinAndSelect('trainingProgram.marks', 'marks')
      .leftJoin("trainingProgram.user", "user")
      .addSelect(['user.id'])
      .getOne()
    console.log(TrainingProgramInfo?.trainingProgramDays[0])

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

const getTrainingDayInfo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const TrainingProgramInfo = await getRepository(TrainingPrograms)
      .createQueryBuilder('trainingProgram')
      .where([{id: req.params.trainingProgramId}])
      .leftJoinAndSelect("trainingProgram.trainingProgramDays", "trainingProgramDays")
      .leftJoinAndSelect('trainingProgramDays.trainingProgramDayExercises', 'trainingProgramDayExercises')
      .leftJoinAndSelect('trainingProgramDayExercises.exercise', 'exercise')
      .leftJoinAndSelect('trainingProgram.marks', 'marks')
      .leftJoin("trainingProgram.user", "user")
      .addSelect(['user.id'])
      .getOne()
    console.log(TrainingProgramInfo?.trainingProgramDays[0])

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
  getTrainingProgramInfo,
  getTrainingDayInfo
}
