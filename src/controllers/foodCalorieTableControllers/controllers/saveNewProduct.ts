import { Request, Response } from "express"
import { getRepository, getConnection } from "typeorm"
import { Products } from "../../../db/entities/Products"
import { ProductCategories } from '../../../db/entities/ProductCategories'
import { Users } from '../../../db/entities/Users'

export const saveNewProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const CreatedProduct = await getRepository(Products)
    .createQueryBuilder('products')
    .insert()
    .into(Products)
    .values([{
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
      }])
    .execute()

    // console.log(CreatedProduct)
    // console.log(CreatedProduct.raw[0].id)

    if (req.body.product.favorite) {
      await getConnection()
      .createQueryBuilder()
      .relation(Users, "favoriteProducts")
      .of(req.body.userId)
      .add(CreatedProduct.raw[0].id)
    }

    if (req.body.product.pinned) {
      await getConnection()
      .createQueryBuilder()
      .relation(Users, "pinnedProducts")
      .of(req.body.userId)
      .add(CreatedProduct.raw[0].id)
    }

    const response = {
      updatedToken: req.body.updatedToken,
      data: {
        product: {
          id: CreatedProduct.raw[0].id,
          title: req.body.product.title,
          weight: 100,
          protein: req.body.product.protein,
          fats: req.body.product.fats,
          carb: req.body.product.carb,
          kkal: req.body.product.kkal,
          category: req.body.product.category,
          favorite: req.body.product.favorite,
          pinned: req.body.product.pinned,
          user: { id: req.body.userId }
        }
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
