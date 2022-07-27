import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import { Users } from '../../../db/entities/Users'

export const changePinnedParam = async (req: Request, res: Response): Promise<Response> => {
  try {
    const User = await dataSource.getRepository(Users)
    .createQueryBuilder('users')
    .where({id: req.body.userId})
    .select(['users.id'])
    .leftJoin('users.pinnedExercises', 'pinnedExercises')
    .addSelect(['pinnedExercises.id'])
    .getOne()
    // console.log(User)

    
    if (User) {
      let isPinned = false

      for (let i = 0; i < User?.pinnedExercises.length; i++) {
        if (User?.pinnedExercises[i].id === parseInt(req.params.exerciseId)) {
          isPinned = true
        }
      }

      if (isPinned) {
        // Для user с id=1 удалить занчение pinnedExercises exerciseId=2
        await dataSource
        .createQueryBuilder()
        .relation(Users, "pinnedExercises")
        .of(req.body.userId)
        .remove(req.params.exerciseId)
      } else {
        // Для user с id=1 установить занчение pinnedExercises exerciseId=2
        await dataSource
        .createQueryBuilder()
        .relation(Users, "pinnedExercises")
        .of(req.body.userId)
        .add(req.params.exerciseId)
      }
  
      return res.status(200).json({
        pinned: !isPinned,
        exerciseId: req.params.exerciseId
      })
    } else {
      return res.status(404).json({
        errors: [
          {
            field: null,
            errorMessage: 'Пользователь не найден. Зарегистрируйтесь или авторизуйтесь, чтобы редактировать закрепленные упражнения.'
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
