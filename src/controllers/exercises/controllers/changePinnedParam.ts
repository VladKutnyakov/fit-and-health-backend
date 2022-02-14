import { Request, Response } from "express"
import { getRepository, getConnection } from "typeorm"
import { Users } from '../../../db/entities/Users'

export const changePinnedParam = async (req: Request, res: Response): Promise<Response> => {
  try {
    const User = await getRepository(Users)
    .createQueryBuilder('users')
    .where({id: req.body.userId})
    .select(['users.id'])
    .leftJoin('users.pinnedExercises', 'pinnedExercises')
    .addSelect(['pinnedExercises.id'])
    .getOne()
    // console.log(User)

    let isPinned = false

    if (User) {
      for (let i = 0; i < User?.pinnedExercises.length; i++) {
        if (User?.pinnedExercises[i].id === parseInt(req.params.exerciseId)) {
          isPinned = true
        }
      }
    }

    if (isPinned) {
      // Для user с id=1 удалить занчение pinnedExercises exerciseId=2
      await getConnection()
      .createQueryBuilder()
      .relation(Users, "pinnedExercises")
      .of(req.body.userId)
      .remove(req.params.exerciseId)
    } else {
      // Для user с id=1 установить занчение pinnedExercises exerciseId=2
      await getConnection()
      .createQueryBuilder()
      .relation(Users, "pinnedExercises")
      .of(req.body.userId)
      .add(req.params.exerciseId)
    }

    const response = {
      data: {
        pinned: !isPinned,
        exerciseId: req.params.exerciseId
      }
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
