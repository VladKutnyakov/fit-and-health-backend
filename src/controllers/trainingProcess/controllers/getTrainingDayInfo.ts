import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import { TrainingProgramDayExerciseApproaches } from "../../../db/entities/TrainingProgramDayExerciseApproaches"
import { TrainingProgramDays } from '../../../db/entities/TrainingProgramDays'

export const getTrainingDayInfo = async (req: Request, res: Response): Promise<Response> => {
  // console.log(req.query.trainingDay)

  try {
    const TrainingDayInfo = await dataSource.getRepository(TrainingProgramDays)
      .createQueryBuilder('trainingProgramDays')
      .where('trainingProgramDays.id = :id', { id: req.query.trainingDay })
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
    // console.log(TrainingDayInfo)
    // console.log(TrainingDayInfo?.trainingProgramDayExercises[0].exercise.exerciseApproaches)

    if (TrainingDayInfo) {
      const exercises = [] as Array<any>

      for (let i = 0; i < TrainingDayInfo?.trainingProgramDayExercises.length; i++) {
        const item = {
          id: TrainingDayInfo?.trainingProgramDayExercises[i]?.exercise?.id,
          title: TrainingDayInfo?.trainingProgramDayExercises[i]?.exercise?.title,
          isStarted: false,
          approaches: [] as Array<any>
        }

        for (let j = 0; j < TrainingDayInfo?.trainingProgramDayExercises[i].approaches; j++) {
          item.approaches.push({
            isActive: false,
            isStarted: false,
            title: `Подход ${j + 1}`,
            repeats: {
              target: TrainingDayInfo?.trainingProgramDayExercises[i]?.repeats,
              value: null,
            },
            additionalWeight: {
              target: TrainingDayInfo?.trainingProgramDayExercises[i]?.additionalWeight,
              value: null,
            },
            implementationTime: {
              teraget: TrainingDayInfo?.trainingProgramDayExercises[i]?.implementationTime,
              value: null,
            },
            restTime: {
              target: TrainingDayInfo?.trainingProgramDayExercises[i]?.restTime,
              value: null,
            },
          })
        }

        exercises.push(item)
      }

      const response = {
        trainingDay: {
          id: TrainingDayInfo?.id,
          title: TrainingDayInfo?.title,
        },
        trainingType: TrainingDayInfo?.trainingType,
        comment: TrainingDayInfo?.comment,
        trainingProgramDayExercises: exercises,
      }

      return res.status(200).json(response)
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
