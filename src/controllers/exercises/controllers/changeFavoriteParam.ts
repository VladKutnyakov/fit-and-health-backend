import { Request, Response } from "express"
import { getRepository, getConnection } from "typeorm"
import { Users } from '../../../db/entities/Users'

export const changeFavoriteParam = async (req: Request, res: Response): Promise<Response> => {
  try {
    const User = await getRepository(Users)
    .createQueryBuilder('users')
    .where({id: req.body.userId})
    .select(['users.id'])
    .leftJoin('users.favoriteExercises', 'favoriteExercises')
    .addSelect(['favoriteExercises.id'])
    .getOne()
    // console.log(User)

    let isFavorite = false

    if (User) {
      for (let i = 0; i < User?.favoriteExercises.length; i++) {
        if (User?.favoriteExercises[i].id === parseInt(req.params.exerciseId)) {
          isFavorite = true
        }
      }
    }

    if (isFavorite) {
      // Для user с id=1 удалить занчение favoriteExercises exerciseId=2
      await getConnection()
      .createQueryBuilder()
      .relation(Users, "favoriteExercises")
      .of(req.body.userId)
      .remove(req.params.exerciseId)
    } else {
      // Для user с id=1 установить занчение favoriteExercises exerciseId=2
      await getConnection()
      .createQueryBuilder()
      .relation(Users, "favoriteExercises")
      .of(req.body.userId)
      .add(req.params.exerciseId)
    }

    const response = {
      updatedToken: req.body.updatedToken,
      data: {
        favorite: !isFavorite,
        exerciseId: req.params.exerciseId
      }
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      updatedToken: req.body.updatedToken,
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
