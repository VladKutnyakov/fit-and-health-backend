import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import { Exercises } from "../../../db/entities/Exercises"

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

    const PinnedExercisesCount = await dataSource.getRepository(Exercises)
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
      .leftJoin('exercises.pinnedForUsers', 'pinnedForUsers', `${'pinnedForUsers.id'} = ${req.body.userId}`)
      .addSelect(['pinnedForUsers.id'])
      .where(`pinnedForUsers.id = ${req.body.userId}`)
      .getCount()

    const FavoriteExercises = await dataSource.getRepository(Exercises)
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
      .leftJoin('exercises.favoriteForUsers', 'favoriteForUsers', `${'favoriteForUsers.id'} = ${req.body.userId}`)
      .addSelect(['favoriteForUsers.id'])
      .where(`favoriteForUsers.id = ${req.body.userId}`)
      .getCount()

    const response = {
      exercises: ExercisesCount,
      userExercises: UserExercisesCount,
      pinnedExercises: PinnedExercisesCount,
      favoriteExercises: FavoriteExercises,
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
