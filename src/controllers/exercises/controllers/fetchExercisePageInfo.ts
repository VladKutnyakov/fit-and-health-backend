import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import { Exercises } from "../../../db/entities/Exercises"
import { Muscles } from "../../../db/entities/Muscles"

export const fetchExercisePageInfo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ExercisesCount = await dataSource.getRepository(Exercises).count()

    const UserExercisesCount = await dataSource.getRepository(Exercises)
      .createQueryBuilder('exercises')
      .select([
        'exercises.id',
        'exercises.title',
        'exercises.techniqueDescription',
        'exercises.previewImage',
        'exercises.power',
        'exercises.endurance',
        'exercises.flexibility',
        'exercises.cardio',
      ])
      .where(`exercises.user = ${req.body.userId}`)
      .getCount()

    const MuscleGroupsCount = await dataSource.getRepository(Muscles).count()

    const response = {
      exercises: ExercisesCount,
      userExercises: UserExercisesCount,
      muscleGroups: MuscleGroupsCount,
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
