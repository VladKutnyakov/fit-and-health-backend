import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import { Products } from "../../../db/entities/Products"

export const getAllProducts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ProductsList = await dataSource.getRepository(Products)
      .createQueryBuilder('products')
      .where("products.user = :id OR products.user IS NULL", { id: req.body.userId })
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
      data: AllProducts
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
