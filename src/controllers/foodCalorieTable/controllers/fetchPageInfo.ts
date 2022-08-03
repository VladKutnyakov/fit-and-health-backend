import { Request, Response } from "express"
import { dataSource } from '@/dataSource'
import { Products } from "@/db/entities/Products"

export const fetchPageInfo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ProductsCount = await dataSource.getRepository(Products)
      .createQueryBuilder('products')
      .select([
        'products.id'
      ])
      .leftJoin('products.user', 'user')
      .addSelect(['user.id'])
      .where(req.body.userId ? `products.user = ${req.body.userId} OR products.user IS NULL` : 'products.user IS NULL')
      .getCount()

    const UserProductsCount = await dataSource.getRepository(Products)
      .createQueryBuilder('products')
      .select([
        'products.id'
      ])
      .where(`products.user = ${req.body.userId}`)
      .getCount()

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

    const response = {
      products: ProductsCount,
      userProducts: UserProductsCount,
      pinned: PinnedProductsCount,
      favorites: FavoriteProducts,
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
