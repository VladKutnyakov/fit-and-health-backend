import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import { Users } from '../../../db/entities/Users'

export const changeFavoriteParam = async (req: Request, res: Response): Promise<Response> => {
  try {
    const User = await dataSource.getRepository(Users)
    .createQueryBuilder('users')
    .where({id: req.body.userId})
    .select(['users.id'])
    .leftJoin('users.favoriteProducts', 'favoriteProducts')
    .addSelect(['favoriteProducts.id'])
    .getOne()
    // console.log(User)

    if (User) {
      let isFavorite = false

      for (let i = 0; i < User?.favoriteProducts.length; i++) {
        if (User?.favoriteProducts[i].id === parseInt(req.params.productId)) {
          isFavorite = true
        }
      }

      if (isFavorite) {
        // Для user с id=1 удалить занчение favoriteProducts productsId=2
        await dataSource
        .createQueryBuilder()
        .relation(Users, "favoriteProducts")
        .of(req.body.userId)
        .remove(req.params.productId)
      } else {
        // Для user с id=1 установить занчение favoriteProducts productsId=2
        await dataSource
        .createQueryBuilder()
        .relation(Users, "favoriteProducts")
        .of(req.body.userId)
        .add(req.params.productId)
      }
  
      const response = {
        data: {
          productId: req.params.productId,
          favorite: !isFavorite
        }
      }
  
      return res.status(200).json(response)
    } else {
      return res.status(404).json({
        errors: [
          {
            field: null,
            errorMessage: 'Пользователь не найден. Зарегистрируйтесь или авторизуйтесь, чтобы редактировать избранные продукты.'
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
