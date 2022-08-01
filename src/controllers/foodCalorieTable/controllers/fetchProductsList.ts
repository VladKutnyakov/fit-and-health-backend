import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import { Products } from "../../../db/entities/Products"

export const fetchProductsList = async (req: Request, res: Response): Promise<Response> => {
  try {
    // console.log(req.query.orderBy ? `products.${req.query.orderBy}` : 'products.title')

    const orderByParams: any = {
      'pinnedForUsers.id': 'ASC',
      // 'products.title': 'ASC',
    }
    orderByParams[req.query.orderBy ? `products.${req.query.orderBy}` : 'products.title'] = req.query.sortDirection ? req.query.sortDirection : 'ASC'
    // console.log(orderByParams)

    const ProductsList = await dataSource.getRepository(Products)
      .createQueryBuilder('products')
      .select([
        'products.id',
        'products.title',
        'products.weight',
        'products.protein',
        'products.fats',
        'products.carb',
        'products.kkal',
      ])
      .where(`products.title LIKE '%${req.query?.searchString || ''}%'`)
      .andWhere(req.query.userType === 'MY' ? `products.user = ${req.body.userId}` : `(products.user = ${req.body.userId} OR products.user IS NULL)`)
      .leftJoinAndSelect('products.category', 'category')
      .leftJoin('products.favoriteForUsers', 'favoriteForUsers', `${'favoriteForUsers.id'} = ${req.body.userId}`)
      .addSelect(['favoriteForUsers.id'])
      .leftJoin('products.pinnedForUsers', 'pinnedForUsers', `${'pinnedForUsers.id'} = ${req.body.userId}`)
      .addSelect(['pinnedForUsers.id'])
      .leftJoin('products.user', 'user')
      .addSelect(['user.id'])
      .orderBy(orderByParams)
      .getMany()
    //   .getSql()
    // console.log(ProductsList)

    const products: Array<any> = []
    for (let i = 0; i < ProductsList.length; i++) {
      products.push({
        id: ProductsList[i].id,
        title: ProductsList[i].title,
        weight: ProductsList[i].weight,
        protein: ProductsList[i].protein,
        fats: ProductsList[i].fats,
        carb: ProductsList[i].carb,
        kkal: ProductsList[i].kkal,
        category: ProductsList[i].category,
        user: ProductsList[i].user,
        favorite: ProductsList[i].favoriteForUsers.length > 0 ? true : false,
        pinned: ProductsList[i].pinnedForUsers.length > 0 ? true : false,
      })
    }
    // console.log(products)

    return res.status(200).json(products)
  } catch (error: any) {
    return res.status(500).json({
      errorMessage: 'Неизвестная ошибка.'
    })
  }































  // try {
  //   const ProductsList = await dataSource.getRepository(Products)
  //     .createQueryBuilder('products')
  //     .where("products.user = :id OR products.user IS NULL", { id: req.body.userId })
  //     .leftJoin("products.user", "user")
  //     .addSelect(['user.id'])
  //     .leftJoinAndSelect('products.category', 'category')
  //     .leftJoin('products.favoriteForUsers', 'favoriteForUsers', `${'favoriteForUsers.id'} = ${req.body.userId}`)
  //     .addSelect(['favoriteForUsers.id'])
  //     .leftJoin('products.pinnedForUsers', 'pinnedForUsers', `${'pinnedForUsers.id'} = ${req.body.userId}`)
  //     .addSelect(['pinnedForUsers.id'])
  //     .orderBy({'products.id': 'ASC'})
  //     .getMany()
  //   // console.log(ProductsList)
  //   // console.log(ProductsList[0].favoriteForUsers)

  //   const AllProducts: any = []

  //   for (let i = 0; i < ProductsList.length; i++) {
  //     const item = {
  //       id: ProductsList[i].id,
  //       title: ProductsList[i].title,
  //       weight: ProductsList[i].weight,
  //       protein: ProductsList[i].protein,
  //       fats: ProductsList[i].fats,
  //       carb: ProductsList[i].carb,
  //       kkal: ProductsList[i].kkal,
  //       user: ProductsList[i].user,
  //       category: ProductsList[i].category,
  //       favorite: ProductsList[i].favoriteForUsers.length > 0 ? true : false,
  //       pinned: ProductsList[i].pinnedForUsers.length > 0 ? true : false,
  //     }

  //     AllProducts.push(item)
  //   }
  //   // console.log(AllProducts)

  //   const response = {
  //     data: AllProducts
  //   }

  //   return res.status(200).json(response)
  // } catch (error: any) {
  //   return res.status(500).json({
  //     errorMessage: 'Неизвестная ошибка.'
  //   })
  // }
}
