import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { TrainingDiaries } from "../db/entities/TrainingDiaries"

const getTrainingDiaryInfo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const targetDate = req.query.date || new Date().toJSON().split('T')[0]
    // console.log(targetDate)

    const TrainingDiaryInfo = await getRepository(TrainingDiaries)
      .createQueryBuilder('trainingDiaries')
      .where([{user: req.body.userId, date: targetDate}])
      .select(['trainingDiaries.id', 'trainingDiaries.date'])
      .leftJoin('trainingDiaries.trainingProgram', 'trainingProgram')
      .addSelect([
        'trainingProgram.id',
        'trainingProgram.title',
        'trainingProgram.description',
      ])
      .leftJoinAndSelect('trainingProgram.marks', 'marks')
      .leftJoinAndSelect('trainingProgram.skill', 'skill')
      .leftJoinAndSelect('trainingProgram.trainingProgramDays', 'trainingProgramDays')
      .leftJoin('trainingProgram.trainingProcesses', 'trainingProcesses')
      .addSelect([
        'trainingProcesses.id',
        'trainingProcesses.approach',
        'trainingProcesses.repeats',
        'trainingProcesses.additionalWeight',
        'trainingProcesses.implementationTime',
        'trainingProcesses.restTime',
      ])
      .leftJoin('trainingProcesses.exercise', 'exercise')
      .addSelect(['exercise.id', 'exercise.title'])
      .leftJoin("trainingDiaries.user", "user")
      .addSelect(['user.id'])
      .getOne()
    // console.log(TrainingDiaryInfo)

    // const EmptyTrainigDiaryInfo = {
    //   id: null,
    //   date: null,
    //   trainingProgram: {
    //     id: null,
    //     title: null,
    //     description: null,
    //     trainingSkill: null,
    //     marks: [],
    //     trainingProgramDays: [],
    //     trainingProcesses: []
    //   },
    //   user: {
    //     id: null
    //   }
    // }

    const response = {
      updatedToken: req.body.updatedToken,
      data: TrainingDiaryInfo || null
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
  getTrainingDiaryInfo
}
