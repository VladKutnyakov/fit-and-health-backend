import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { TrainingProgramDays } from '../../../db/entities/TrainingProgramDays'

export const getTrainingDayInfo = async (req: Request, res: Response): Promise<Response> => {
  // console.log(req.query.trainingDayId)

  try {
    const TrainingDayInfo = await getRepository(TrainingProgramDays)
      .createQueryBuilder('trainingProgramDays')
      .where([{id: req.query.trainingDayId}])
      .leftJoin("trainingProgramDays.trainingProgramDayExercises", "trainingProgramDayExercises")
      .addSelect([
        'trainingProgramDayExercises.approaches',
        'trainingProgramDayExercises.repeats',
        'trainingProgramDayExercises.additionalWeight',
        'trainingProgramDayExercises.implementationTime',
        'trainingProgramDayExercises.restTime'
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
