import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { TrainingPrograms } from "../../../db/entities/TrainingPrograms"

export const getTrainingProgramInfo = async (req: Request, res: Response): Promise<Response> => {
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
      .leftJoin('trainingProgramDays.trainingProgramDayExercises', 'trainingProgramDayExercises')
      .addSelect([
        'trainingProgramDayExercises.approaches',
        'trainingProgramDayExercises.repeats',
        'trainingProgramDayExercises.additionalWeight',
        'trainingProgramDayExercises.implementationTime',
        'trainingProgramDayExercises.restTime'
      ])
      .leftJoin('trainingProgramDayExercises.exercise', 'exercise')
      .addSelect([
        'exercise.id',
        'exercise.title',
      ])
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
