import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import { TrainingProgramDays } from '../../../db/entities/TrainingProgramDays'

export const getTrainingDayInfo = async (req: Request, res: Response): Promise<Response> => {
  // console.log(req.query.trainingDay)

  try {
    const TrainingDayInfo = await dataSource.getRepository(TrainingProgramDays)
      .createQueryBuilder('trainingProgramDays')
      .where([{id: req.query.trainingDay}])
      .leftJoinAndSelect('trainingProgramDays.trainingType', 'trainingType')
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
      // .leftJoinAndSelect('exercise.exerciseApproaches', 'exerciseApproaches', "exerciseApproaches.date = '2021-11-24'") // получить данные с последней тренировки
      .getOne()
    // console.log(TrainingDayInfo?.trainingProgramDayExercises[0].exercise.exerciseApproaches)

    if (TrainingDayInfo) {
      return res.status(200).json(TrainingDayInfo)
    } else {
      return res.status(400).json({
        errorMessage: 'Тренировочный день не найден.'
      })
    }
  } catch (error: any) {
    return res.status(500).json({
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
