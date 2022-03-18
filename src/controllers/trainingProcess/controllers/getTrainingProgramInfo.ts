import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { TrainingPrograms } from "../../../db/entities/TrainingPrograms"

export const getTrainingProgramInfo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const TrainingProgramInfo = await getRepository(TrainingPrograms)
      .createQueryBuilder('trainingProgram')
      .where([{id: req.query.trainingProgram}])
      .select(['trainingProgram.id', 'trainingProgram.title'])
      .leftJoin("trainingProgram.trainingProgramDays", "trainingProgramDays")
      .addSelect(['trainingProgramDays.id', 'trainingProgramDays.title'])
      .leftJoin("trainingProgram.user", "user")
      .addSelect(['user.id'])
      .getOne()
    // console.log(TrainingProgramInfo)

    if (TrainingProgramInfo) {
      const response = {
        program: {
          id: TrainingProgramInfo?.id,
          title: TrainingProgramInfo?.title
        },
        day: req.query.trainingProgram ? TrainingProgramInfo?.trainingProgramDays.filter((item: any) => item.id == req.query.trainingDay)[0] : null,
        trainingProgramDays: TrainingProgramInfo?.trainingProgramDays
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
