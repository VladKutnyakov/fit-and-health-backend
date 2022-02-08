import { Request, Response } from "express"
import { getRepository, getConnection } from "typeorm"
import { Products } from "../../../db/entities/Products"
import { ProductCategories } from '../../../db/entities/ProductCategories'
import { Users } from '../../../db/entities/Users'

export const getAllProducts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ProductsList = await getRepository(Products)
      .createQueryBuilder('products')
      .where([{user: req.body.userId}, {user: null}])
      .leftJoin("products.user", "user")
      .addSelect(['user.id'])
      .leftJoinAndSelect('products.category', 'category')
      .leftJoin('products.favoriteForUsers', 'favoriteForUsers', `${'favoriteForUsers.id'} = ${req.body.userId}`)
      .addSelect(['favoriteForUsers.id'])
      .leftJoin('products.pinnedForUsers', 'pinnedForUsers', `${'pinnedForUsers.id'} = ${req.body.userId}`)
      .addSelect(['pinnedForUsers.id'])
      .orderBy({'products.id': 'ASC'})
      .getMany()
    // console.log(ProductsList)
    // console.log(ProductsList[0].favoriteForUsers)

    const AllProducts: any = []

    for (let i = 0; i < ProductsList.length; i++) {
      const item = {
        id: ProductsList[i].id,
        title: ProductsList[i].title,
        weight: ProductsList[i].weight,
        protein: ProductsList[i].protein,
        fats: ProductsList[i].fats,
        carb: ProductsList[i].carb,
        kkal: ProductsList[i].kkal,
        user: ProductsList[i].user,
        category: ProductsList[i].category,
        favorite: ProductsList[i].favoriteForUsers.length > 0 ? true : false,
        pinned: ProductsList[i].pinnedForUsers.length > 0 ? true : false,
      }

      AllProducts.push(item)
    }
    // console.log(AllProducts)

    const response = {
      updatedToken: req.body.updatedToken,
      data: AllProducts
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      updatedToken: req.body.updatedToken,
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
