import { Request, Response } from "express"
import { dataSource } from '@/dataSource'
import { Users } from '@/db/entities/Users'

export const changeFavoriteParam = async (req: Request, res: Response): Promise<Response> => {
  try {
    const User = await dataSource.getRepository(Users)
      .createQueryBuilder('users')
      .where({id: req.body.userId})
      .select(['users.id'])
      .leftJoin('users.favoriteExercises', 'favoriteExercises')
      .addSelect(['favoriteExercises.id'])
      .getOne()
    // console.log(User)

    if (User) {
      let isFavorite = false

      for (let i = 0; i < User?.favoriteExercises.length; i++) {
        if (User?.favoriteExercises[i].id === parseInt(req.params.exerciseId)) {
          isFavorite = true
        }
      }

      if (isFavorite) {
        // Для user с id=1 удалить занчение favoriteExercises exerciseId=2
        await dataSource
          .createQueryBuilder()
          .relation(Users, "favoriteExercises")
          .of(req.body.userId)
          .remove(req.params.exerciseId)
      } else {
        // Для user с id=1 установить занчение favoriteExercises exerciseId=2
        await dataSource
          .createQueryBuilder()
          .relation(Users, "favoriteExercises")
          .of(req.body.userId)
          .add(req.params.exerciseId)
      }
  
      return res.status(200).json({
        favorite: !isFavorite,
        exerciseId: req.params.exerciseId
      })
    } else {
      return res.status(404).json({
        errors: [
          {
            field: null,
            errorMessage: 'Пользователь не найден. Зарегистрируйтесь или авторизуйтесь, чтобы редактировать избранные упражнения.'
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
