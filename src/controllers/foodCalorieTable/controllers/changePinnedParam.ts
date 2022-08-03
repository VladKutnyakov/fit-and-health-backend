import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import { Users } from '../../../db/entities/Users'

export const changePinnedParam = async (req: Request, res: Response): Promise<Response> => {
  try {
    if (req.body.userId) {
      const User = await dataSource.getRepository(Users)
      .createQueryBuilder('users')
      .where({id: req.body.userId})
      .select(['users.id'])
      .leftJoin('users.pinnedProducts', 'pinnedProducts')
      .addSelect(['pinnedProducts.id'])
      .getOne()
      // console.log(User)

      if (User) {
        let isPinned = false

        for (let i = 0; i < User?.pinnedProducts.length; i++) {
          if (User?.pinnedProducts[i].id === parseInt(req.params.productId)) {
            isPinned = true
          }
        }

        if (isPinned) {
          // Для user с id=1 удалить занчение pinnedProducts productsId=2
          await dataSource
          .createQueryBuilder()
          .relation(Users, "pinnedProducts")
          .of(req.body.userId)
          .remove(req.params.productId)
        } else {
          // Для user с id=1 установить занчение pinnedProducts productsId=2
          await dataSource
          .createQueryBuilder()
          .relation(Users, "pinnedProducts")
          .of(req.body.userId)
          .add(req.params.productId)
        }

        const response = {
          productId: req.params.productId,
          pinned: !isPinned
        }

        return res.status(200).json(response)
      } else {
        return res.status(404).json({
          errors: [
            {
              field: null,
              errorMessage: 'Пользователь не найден. Зарегистрируйтесь или авторизуйтесь, чтобы редактировать закрепленные продукты.'
            }
          ]
        })
      }
    } else {
      return res.status(404).json({
        errors: [
          {
            field: null,
            errorMessage: 'Пользователь не найден. Зарегистрируйтесь или авторизуйтесь, чтобы редактировать закрепленные продукты.'
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
