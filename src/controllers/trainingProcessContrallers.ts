import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { TrainingPrograms } from "../db/entities/TrainingPrograms"
import { TrainingProgramDays } from '../db/entities/TrainingProgramDays'

const getTrainingProgramInfo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const TrainingProgramInfo = await getRepository(TrainingPrograms)
      .createQueryBuilder('trainingProgram')
      .where([{id: req.params.trainingProgramId || 1}])
      .select(['trainingProgram.id', 'trainingProgram.title'])
      .leftJoin("trainingProgram.trainingProgramDays", "trainingProgramDays")
      .addSelect(['trainingProgramDays.id', 'trainingProgramDays.title'])
      .leftJoin("trainingProgram.user", "user")
      .addSelect(['user.id'])
      .getOne()
    // console.log(TrainingProgramInfo)

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
  // console.log(req.query.trainingDayId)

  try {
    const TrainingDayInfo = await getRepository(TrainingProgramDays)
      .createQueryBuilder('trainingProgramDays')
      .where([{id: req.query.trainingDayId}])
      .leftJoin("trainingProgramDays.trainingProgramDayExercises", "trainingProgramDayExercises")
      .addSelect([
        'trainingProgramDayExercises.approaches',
        'trainingProgramDayExercises.repeats',
        'trainingProgramDayExercises.additionalWeight'
      ])
      .leftJoin('trainingProgramDayExercises.exercise', 'exercise')
      .addSelect(['exercise.id', 'exercise.title'])
      .leftJoinAndSelect('exercise.exerciseApproaches', 'exerciseApproaches', "exerciseApproaches.date = '2021-11-24'")
      .getOne()
    // console.log(TrainingDayInfo?.trainingProgramDayExercises[0].exercise.exerciseApproaches)

    const response = {
      updatedToken: req.body.updatedToken,
      data: TrainingDayInfo
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
