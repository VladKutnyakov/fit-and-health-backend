import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import { Products } from "../../../db/entities/Products"
import { ProductCategories } from "../../../db/entities/ProductCategories"

export const fetchPageInfo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ProductsCount = await dataSource.getRepository(Products).count()

    const PinnedProductsCount = await dataSource.getRepository(Products)
      .createQueryBuilder('products')
      .select([
        'products.id'
      ])
      .leftJoin('products.pinnedForUsers', 'pinnedForUsers', `${'pinnedForUsers.id'} = ${req.body.userId}`)
      .addSelect(['pinnedForUsers.id'])
      .where(`pinnedForUsers.id = ${req.body.userId}`)
      .getCount()

    const FavoriteProducts = await dataSource.getRepository(Products)
      .createQueryBuilder('products')
      .select([
        'products.id'
      ])
      .leftJoin('products.favoriteForUsers', 'favoriteForUsers', `${'favoriteForUsers.id'} = ${req.body.userId}`)
      .addSelect(['favoriteForUsers.id'])
      .where(`favoriteForUsers.id = ${req.body.userId}`)
      .getCount()

      const UserProductsCount = await dataSource.getRepository(Products)
      .createQueryBuilder('products')
      .select([
        'products.id'
      ])
      .where(`products.user = ${req.body.userId}`)
      .getCount()

    const response = {
      products: ProductsCount,
      pinned: PinnedProductsCount,
      favorites: FavoriteProducts,
      userProducts: UserProductsCount,
    }

    return res.status(200).json(response)
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
