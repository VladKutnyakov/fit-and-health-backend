import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import { Products } from "../../../db/entities/Products"
import { ProductCategories } from '../../../db/entities/ProductCategories'
import { Users } from '../../../db/entities/Users'

export const saveNewProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const CreatedProduct = await dataSource.getRepository(Products)
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
        user: dataSource.getRepository(Users).create({
          id: req.body.userId,
        }),
        category: dataSource.getRepository(ProductCategories).create({
          id: req.body.product.category.id,
        })
      }])
    .execute()

    // console.log(CreatedProduct)
    // console.log(CreatedProduct.raw[0].id)

    if (req.body.product.favorite) {
      await dataSource
      .createQueryBuilder()
      .relation(Users, "favoriteProducts")
      .of(req.body.userId)
      .add(CreatedProduct.raw[0].id)
    }

    if (req.body.product.pinned) {
      await dataSource
      .createQueryBuilder()
      .relation(Users, "pinnedProducts")
      .of(req.body.userId)
      .add(CreatedProduct.raw[0].id)
    }

    const response = {
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
      errors: [
        {
          field: null,
          errorMessage: 'Неизвестная ошибка.'
        }
      ]
    })
  }
}
