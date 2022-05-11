import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
// import { TrainingPrograms } from "../db/entities/TrainingPrograms"
// import { TrainingProgramDays } from '../db/entities/TrainingProgramDays'
// import { TrainingProgramDayExercises } from '../db/entities/TrainingProgramDayExercises'
// import { Exercises } from '../db/entities/Exercises'
// import { Users } from '../db/entities/Users'
// import { Skills } from '../db/entities/Skills'

export const updateTrainingProgram = async (req: Request, res: Response): Promise<Response> => {
  try {

    return res.status(200).json(null)
  } catch (error: any) {
    return res.status(500).json({
      errors: [
        {
          field: null,
          errorMessage: 'Неизвестная ошибка.'
        }
      ]
    })
  }
}
