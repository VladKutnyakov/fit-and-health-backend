import { Request, Response } from "express"
import { getManager, getRepository, getConnection } from "typeorm"
import { Products } from "../db/entities/Products"
import { ProductCategories } from '../db/entities/ProductCategories'
import { Users } from '../db/entities/Users'

const getProductCategories = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ProductCategoriesList = await getRepository(ProductCategories)
      .createQueryBuilder('categories')
      .orderBy({'id': 'ASC'})
      .getMany()

    const response = {
      updatedToken: req.body.updatedToken,
      data: ProductCategoriesList
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      updatedToken: req.body.updatedToken,
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}

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

const updateProduct = async (req: Request, res: Response): Promise<Response> => {
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
    const User = await getRepository(Users)
    .createQueryBuilder('users')
    .where({id: req.body.userId})
    .select(['users.id'])
    .leftJoin('users.favoriteProducts', 'favoriteProducts')
    .addSelect(['favoriteProducts.id'])
    .getOne()
    // console.log(User)

    let isFavorite = false

    if (User) {
      for (let i = 0; i < User?.favoriteProducts.length; i++) {
        if (User?.favoriteProducts[i].id === req.body.productId) {
          isFavorite = true
        }
      }
    }

    if (isFavorite) {
      // Для user с id=1 удалить занчение favoriteProducts productsId=2
      await getConnection()
      .createQueryBuilder()
      .relation(Users, "favoriteProducts")
      .of(req.body.userId)
      .remove(req.body.productId)
    } else {
      // Для user с id=1 установить занчение favoriteProducts productsId=2
      await getConnection()
      .createQueryBuilder()
      .relation(Users, "favoriteProducts")
      .of(req.body.userId)
      .add(req.body.productId)
    }

    const response = {
      updatedToken: req.body.updatedToken,
      data: {
        productId: req.body.productId,
        favorite: !isFavorite
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
        if (User?.pinnedProducts[i].id === req.body.productId) {
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
      .remove(req.body.productId)
    } else {
      // Для user с id=1 установить занчение pinnedProducts productsId=2
      await getConnection()
      .createQueryBuilder()
      .relation(Users, "pinnedProducts")
      .of(req.body.userId)
      .add(req.body.productId)
    }

    const response = {
      updatedToken: req.body.updatedToken,
      data: {
        productId: req.body.productId,
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

export default {
  getProductCategories,
  getAllProducts,
  saveNewProduct,
  updateProduct,
  removeProduct,
  changeFavoriteParam,
  changePinnedParam
}
