import { Request, Response } from "express"
import { getRepository, getConnection } from "typeorm"
import { Products } from "../../../db/entities/Products"
import { ProductCategories } from '../../../db/entities/ProductCategories'
import { Users } from '../../../db/entities/Users'

export const updateProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Обновить основные данные о продукте
    const UpdatedProduct = await getRepository(Products)
    .createQueryBuilder('products')
    .update(Products)
    .set({
        title: req.body.product.title,
        weight: 100,
        protein: req.body.product.protein,
        fats: req.body.product.fats,
        carb: req.body.product.carb,
        kkal: req.body.product.kkal,
        user: getRepository(Users).create({
          id: req.body.userId,
        }),
        category: getRepository(ProductCategories).create({
          id: req.body.product.category.id,
        })
      })
    .where(`id = ${req.body.product.id}`)
    .execute()

    // Узнать есть ли продукт в избранном и закрепленном у пользователя
    const Product = await getRepository(Products)
      .createQueryBuilder('products')
      .select('products.id')
      .where([{id: req.body.product.id}])
      .leftJoin('products.favoriteForUsers', 'favoriteForUsers', `${'favoriteForUsers.id'} = ${req.body.userId}`)
      .addSelect(['favoriteForUsers.id'])
      .leftJoin('products.pinnedForUsers', 'pinnedForUsers', `${'pinnedForUsers.id'} = ${req.body.userId}`)
      .addSelect(['pinnedForUsers.id'])
      .getOne()

    // console.log(Product?.favoriteForUsers.length)
    // console.log(Product?.pinnedForUsers.length)

    if (Product?.favoriteForUsers && Product?.favoriteForUsers.length === 0 && req.body.product.favorite) {
      await getConnection()
      .createQueryBuilder()
      .relation(Users, "favoriteProducts")
      .of(req.body.userId)
      .add(req.body.product.id)
    } else if (Product?.favoriteForUsers && Product?.favoriteForUsers.length > 0 && !req.body.product.favorite) {
      await getConnection()
      .createQueryBuilder()
      .relation(Users, "favoriteProducts")
      .of(req.body.userId)
      .remove(req.body.product.id)
    }

    if (Product?.pinnedForUsers && Product?.pinnedForUsers.length === 0 && req.body.product.pinned) {
      await getConnection()
      .createQueryBuilder()
      .relation(Users, "pinnedProducts")
      .of(req.body.userId)
      .add(req.body.product.id)
    } else if (Product?.pinnedForUsers && Product?.pinnedForUsers.length > 0 && !req.body.product.pinned) {
      await getConnection()
      .createQueryBuilder()
      .relation(Users, "pinnedProducts")
      .of(req.body.userId)
      .remove(req.body.product.id)
    }

    const response = {
      updatedToken: req.body.updatedToken,
      data: {
        product: req.body.product
      }
    }

    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({
      updatedToken: req.body.updatedToken,
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
