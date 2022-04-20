import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import { Exercises } from "../../../db/entities/Exercises"

export const removeExercise = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Обработка ошибки - указан ли id упражнения, которое необходимо удалить
    if (!req.params.exerciseId) {
      return res.status(400).json({
        errors: [
          {
            field: null,
            errorMessage: 'Не указано упражнение, которое должно быть удалено.'
          }
        ]
      })
    }

    const TargetExercise = await dataSource.getRepository(Exercises)
      .createQueryBuilder('exercises')
      .select(['exercises.id'])
      .leftJoin('exercises.user', 'user')
      .addSelect(['user.id'])
      .where(`exercises.id = ${req.params.exerciseId}`)
      .getOne()
    // console.log(TargetExercise?.user?.id)

    // Обработка ошибки - упражнение не найдено
    if (!TargetExercise) {
      return res.status(400).json({
        errors: [
          {
            field: null,
            errorMessage: 'Упражнение не найдено.'
          }
        ]
      })
    }

    // Обработка ошибки - у упражнения не указан пользователь или не совпали указанные id пользователя и id авторизованного пользователя
    if (TargetExercise?.user?.id && TargetExercise?.user?.id === req.body.userId) {
      await dataSource.getRepository(Exercises)
        .createQueryBuilder('exercises')
        .softDelete()
        .from(Exercises)
        .where(`exercises.id = ${req.params.exerciseId}`)
        .execute()

      return res.status(200).json({
        exerciseId: TargetExercise?.id
      })
    } else {
      return res.status(400).json({
        errors: [
          {
            field: null,
            errorMessage: 'Нельзя удалить упражнение, добавленное другими пользователями или администраторами.'
          }
        ]
      })
    }
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
