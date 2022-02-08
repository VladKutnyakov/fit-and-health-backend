import { Request, Response } from "express"
import { getRepository, getConnection } from "typeorm"
import { Products } from "../../db/entities/Products"
import { ProductCategories } from '../../db/entities/ProductCategories'
import { Users } from '../../db/entities/Users'

export const changePinnedParam = async (req: Request, res: Response): Promise<Response> => {
  try {
    const User = await getRepository(Users)
    .createQueryBuilder('users')
    .where({id: req.body.userId})
    .select(['users.id'])
    .leftJoin('users.pinnedProducts', 'pinnedProducts')
    .addSelect(['pinnedProducts.id'])
    .getOne()
    // console.log(User)

    let isPinned = false

    if (User) {
      for (let i = 0; i < User?.pinnedProducts.length; i++) {
        if (User?.pinnedProducts[i].id === parseInt(req.params.productId)) {
          isPinned = true
        }
      }
    }

    if (isPinned) {
      // Для user с id=1 удалить занчение pinnedProducts productsId=2
      await getConnection()
      .createQueryBuilder()
      .relation(Users, "pinnedProducts")
      .of(req.body.userId)
      .remove(req.params.productId)
    } else {
      // Для user с id=1 установить занчение pinnedProducts productsId=2
      await getConnection()
      .createQueryBuilder()
      .relation(Users, "pinnedProducts")
      .of(req.body.userId)
      .add(req.params.productId)
    }

    const response = {
      updatedToken: req.body.updatedToken,
      data: {
        productId: req.params.productId,
        pinned: !isPinned
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
