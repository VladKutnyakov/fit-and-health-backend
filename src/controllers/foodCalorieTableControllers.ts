import { Request, Response } from "express"
import { getManager, getRepository } from "typeorm"
import { Products } from "../db/entities/Products"
import { ProductCategories } from '../db/entities/ProductCategories'
import { Users } from '../db/entities/Users'

const getAllProducts = async (req: Request, res: Response): Promise<Response> => {
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

const saveNewProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ProductUser = await getManager().findOne(Users, { where: { id: req.body.userId } })

    const ProductCategory = await getManager().findOne(ProductCategories, { where: { id: req.body.product.category.id } })

    const CreatedProduct = await getManager().save(Products, {
      title: req.body.product.title.toString(),
      weight: 100,
      protein: parseFloat(req.body.product.protein),
      fats: parseFloat(req.body.product.fats),
      carb: parseFloat(req.body.product.carb),
      kkal: parseFloat(req.body.product.kkal),
      user: ProductUser,
      category: ProductCategory
    })
    // console.log(CreatedProduct);

    const Product = {
      id: CreatedProduct.id,
      title: CreatedProduct.title,
      weight: CreatedProduct.weight,
      protein: CreatedProduct.protein,
      fats: CreatedProduct.fats,
      carb: CreatedProduct.carb,
      kkal: CreatedProduct.kkal,
      favorite: false,
      pinned: false,
      user: CreatedProduct.user.id,
      category: {
        id: CreatedProduct.category.id,
        title: CreatedProduct.category.title,
      }
    }

    // if (req.body.product.favorite) {
    //   await getManager().save(FavoriteProducts, {
    //     userId: req.body.userId,
    //     productId: CreatedProduct.id
    //   })
    //   Product.favorite = true
    // }

    // if (req.body.product.pinned) {
    //   await getManager().save(PinnedProducts, {
    //     userId: req.body.userId,
    //     productId: CreatedProduct.id
    //   })
    //   Product.pinned = true
    // }

    const response = {
      updatedToken: req.body.updatedToken,
      data: {
        product: Product
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

const updateProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const TargetProductCategory = await getManager().findOne(ProductCategories, { where: { id: req.body.product?.category?.id } })

    const UpdatedProduct = await getManager().update(
      Products,
      req.body.product.id,
      {
        title: req.body.product.title,
        protein: req.body.product.protein,
        fats: req.body.product.fats,
        carb: req.body.product.carb,
        kkal: req.body.product.kkal,
        category: TargetProductCategory,
      }
    )
    // console.log(UpdatedProduct)

    // Обновить информацию в таблице "Избранные продукты"
    // const FavoriteProduct = await getManager().findOne(
    //   FavoriteProducts,
    //   {
    //     where: {
    //       userId: req.body.userId,
    //       productId: req.body.product.id
    //     }
    //   }
    // )
    // console.log(FavoriteProduct)

    // if (req.body.product.favorite && !FavoriteProduct) {
    //   // Добавить продукт в избранное
    //   await getManager().save(FavoriteProducts, {
    //     userId: req.body.userId,
    //     productId: req.body.product.id
    //   })
    // } else if (!req.body.product.favorite && FavoriteProduct) {
    //   // Удалить продукт из избранного
    //   await getManager().delete(FavoriteProducts, FavoriteProduct)
    // }

    // Обновить информацию в таблице "Закрепленные продукты"
    // const PinnedProduct = await getManager().findOne(
    //   PinnedProducts,
    //   {
    //     where: {
    //       userId: req.body.userId,
    //       productId: req.body.product.id
    //     }
    //   }
    // )
    // console.log(PinnedProduct)

    // if (req.body.product.pinned && !PinnedProduct) {
    //   // Добавить продукт в избранное
    //   await getManager().save(PinnedProducts, {
    //     userId: req.body.userId,
    //     productId: req.body.product.id
    //   })
    // } else if (!req.body.product.pinned && PinnedProduct) {
    //   // Удалить продукт из избранного
    //   await getManager().delete(PinnedProducts, PinnedProduct)
    // }

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

const removeProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const Product = await getManager().findOne(
      Products,
      {
        where: {
          id: req.params.productId,
          user: req.body.userId
        }
      }
    )

    let isRemoved = false

    if (Product) {
      await getManager().remove(Products, Product)
      // await getManager().delete(FavoriteProducts, { productId: req.params.productId })
      // await getManager().delete(PinnedProducts, { productId: req.params.productId })
      isRemoved = true
    }

    const response = {
      updatedToken: req.body.updatedToken,
      data: {
        removed: isRemoved,
        productId: req.params.productId
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

const changeFavoriteParam = async (req: Request, res: Response): Promise<Response> => {
  try {

    // Поиск, есть ли продукт в избранном у пользователя
    // const FavoriteProduct = await getManager().findOne(
    //   FavoriteProducts,
    //   {
    //     where: {
    //       userId: req.body.userId,
    //       productId: req.body.productId
    //     }
    //   }
    // )

    let isFavorite = false

    // if (FavoriteProduct) {
    //   // Удалить продукт из избранного
    //   await getManager().delete(FavoriteProducts, FavoriteProduct)
    //   isFavorite = false
    // } else {
    //   // Добавить продукт в избранное
    //   await getManager().save(FavoriteProducts, {
    //     userId: req.body.userId,
    //     productId: req.body.productId
    //   })
    //   isFavorite = true
    // }

    const response = {
      updatedToken: req.body.updatedToken,
      data: {
        productId: req.body.productId,
        favorite: isFavorite
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

const changePinnedParam = async (req: Request, res: Response): Promise<Response> => {
  try {

    // Поиск, есть ли продукт в избранном у пользователя
    // const PinnedProduct = await getManager().findOne(
    //   PinnedProducts,
    //   {
    //     where: {
    //       userId: req.body.userId,
    //       productId: req.body.productId
    //     }
    //   }
    // )

    let isPinned = false

    // if (PinnedProduct) {
    //   // Удалить продукт из избранного
    //   await getManager().delete(PinnedProducts, PinnedProduct)
    //   isPinned = false
    // } else {
    //   // Добавить продукт в избранное
    //   await getManager().save(PinnedProducts, {
    //     userId: req.body.userId,
    //     productId: req.body.productId
    //   })
    //   isPinned = true
    // }

    const response = {
      updatedToken: req.body.updatedToken,
      data: {
        productId: req.body.productId,
        pinned: isPinned
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

export default {
  getAllProducts,
  saveNewProduct,
  updateProduct,
  removeProduct,
  changeFavoriteParam,
  changePinnedParam
}
