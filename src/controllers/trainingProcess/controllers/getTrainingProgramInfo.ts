import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import { TrainingPrograms } from "../../../db/entities/TrainingPrograms"

export const getTrainingProgramInfo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const TrainingProgramInfo = await dataSource.getRepository(TrainingPrograms)
      .createQueryBuilder('trainingProgram')
      .where('trainingProgram.id = :id', { id: req.query.trainingProgram })
      .select(['trainingProgram.id', 'trainingProgram.title'])
      .leftJoin("trainingProgram.trainingProgramDays", "trainingProgramDays")
      .addSelect(['trainingProgramDays.id', 'trainingProgramDays.title'])
      .leftJoin("trainingProgram.user", "user")
      .addSelect(['user.id'])
      .getOne()
    // console.log(TrainingProgramInfo)

    if (TrainingProgramInfo) {
      const response = {
        trainingProgram: {
          id: TrainingProgramInfo?.id,
          title: TrainingProgramInfo?.title
        },
        previewImage: null,
        trainingProgramAccent: {
          power: null,
          endurance: null,
          flexibility: null,
          cardio: null,
        },
        trainingDay: req.query.trainingDay ? TrainingProgramInfo?.trainingProgramDays.filter((item: any) => item.id == req.query.trainingDay)[0] : null,
        trainingProgramDaysList: TrainingProgramInfo?.trainingProgramDays
      }

      return res.status(200).json(response)
    } else {
      return res.status(400).json({
        errorMessage: 'Тренировочная программа не найдена.'
      })
    }
  } catch (error: any) {
    return res.status(500).json({
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
