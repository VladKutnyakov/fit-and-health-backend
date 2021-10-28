import { Request, Response } from "express"
import { resolve } from "path/posix"
import { getManager } from "typeorm"
import { Products } from "../db/entities/Products"
import { Users } from "../db/entities/Users"

const getAllProducts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const entityManager = getManager()

    const ProductsList = await entityManager.find(
      Products,
      {
        where: [
          { user: req.body.userId },
          { user: null }
        ],
        relations: ['user', 'category']
      }
    )

    const UserFavoriteProducts = await entityManager.findOne(
      Users,
      {
        select: ['id'],
        where: [
          { id: req.body.userId }
        ],
        relations: ['favoriteProducts']
      }
    )
    // console.log(UserFavoriteProducts?.favoriteProducts)

    const UserPinnedProducts = await entityManager.findOne(
      Users,
      {
        select: ['id'],
        where: [
          { id: req.body.userId }
        ],
        relations: ['pinnedProducts']
      }
    )
    // console.log(UserPinnedProducts?.pinnedProducts)

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
        user: ProductsList[i]?.user?.id || null,
        category: {
          id: ProductsList[i]?.category?.id || null,
          title: ProductsList[i]?.category?.title || null,
        },
        favorite: false,
        pinned: false,
      }

      if (UserFavoriteProducts) {
        const favoriteProducts = UserFavoriteProducts?.favoriteProducts

        for (let f = 0; f < favoriteProducts.length; f++) {
          if (favoriteProducts[f].id === item.id) {
            item.favorite = true
          }
        }
      }

      if (UserPinnedProducts) {
        const pinnedProducts = UserPinnedProducts?.pinnedProducts

        for (let p = 0; p < pinnedProducts.length; p++) {
          if (pinnedProducts[p].id === item.id) {
            item.pinned = true
          }
        }
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
      message: 'Неизвестная ошибка.'
    })
  }
}

// module.exports.saveNewProduct = async function (req, res) {
//   try {
//     const product = await sequelize.transaction( async (t) => {
//       const savedProduct = await Products.create({
//         title: req.body.product.title,
//         weight: req.body.product.weight,
//         protein: req.body.product.protein,
//         fats: req.body.product.fats,
//         carb: req.body.product.carb,
//         kkal: req.body.product.kkal,
//         category: req.body.product.category,
//         userId: req.body.userId,
//       }, { transaction: t })

//       if (req.body.product.favorite) {
//         await FavoriteProducts.create({
//           userId: req.body.userId,
//           productId: savedProduct.dataValues.id
//         }, { transaction: t })
//       }

//       if (req.body.product.pinned) {
//         await PinnedProducts.create({
//           userId: req.body.userId,
//           productId: savedProduct.dataValues.id
//         }, { transaction: t })
//       }

//       const product = {...savedProduct.toJSON()}
//       product.favorite = req.body.product.favorite
//       product.pinned = req.body.product.pinned

//       return product
//     })

//     const response = {
//       updatedToken: req.body.updatedToken,
//       data: {
//         product: product
//       }
//     }

//     res.status(200).json(response)
//   } catch (error) {
//     console.log(error)
//     res.status(500).json(error)
//   }
// }

// module.exports.updateProduct = async function (req, res) {
//   try {
//     const product = await sequelize.transaction( async (t) => {
//       await Products.update(
//         {
//           title: req.body.product.title,
//           weight: req.body.product.weight,
//           protein: req.body.product.protein,
//           fats: req.body.product.fats,
//           carb: req.body.product.carb,
//           kkal: req.body.product.kkal,
//           category: req.body.product.category,
//         },
//         {
//           where: {
//             [Op.and]: [
//               { id: req.body.product.id },
//               { userId: req.body.userId }
//             ]
//           }
//         },
//         { transaction: t }
//       )

//       if (req.body.product.favorite) {
//         await FavoriteProducts.create({
//           userId: req.body.userId,
//           productId: req.body.product.id
//         }, { transaction: t })
//       } else {
//         await FavoriteProducts.destroy({
//           where: {
//             [Op.and]: [
//               { userId: req.body.userId },
//               { productId: req.body.product.id }
//             ]
//           }
//         }, { transaction: t })
//       }

//       if (req.body.product.pinned) {
//         await PinnedProducts.create({
//           userId: req.body.userId,
//           productId: req.body.product.id
//         }, { transaction: t })
//       } else {
//         await PinnedProducts.destroy({
//           where: {
//             [Op.and]: [
//               { userId: req.body.userId },
//               { productId: req.body.product.id }
//             ]
//           }
//         }, { transaction: t })
//       }

//       return true
//     })

//     const response = {
//       updatedToken: req.body.updatedToken,
//       data: {
//         product: product ? {...req.body.product} : false
//       }
//     }

//     res.status(200).json(response)
//   } catch (error) {
//     console.log(error)
//     res.status(500).json(error)
//   }
// }

// module.exports.removeProduct = async function (req, res) {
//   try {
//     const RemoveProduct = await Products.destroy({
//       where: {
//         [Op.and]: [
//           {id: req.params.id},
//           {userId: req.body.userId}
//         ]
//       }
//     })

//     const response = {
//       updatedToken: req.body.updatedToken,
//       data: {
//         removed: RemoveProduct ? true : false,
//         productId: req.params.id
//       }
//     }

//     res.status(200).json(response)
//   } catch (error) {
//     console.log(error)
//     res.status(500).json(error)
//   }
// }

// module.exports.changeFavoriteParam = async function (req, res) {
//   try {
//     const isFavorite = await sequelize.transaction( async (t) => {
//       const favoriteProduct = await FavoriteProducts.findOne({
//         where: {
//           [Op.and]: [
//             { userId: req.body.userId },
//             { productId: req.body.productId }
//           ]
//         },
//       }, { transaction: t })

//       if (favoriteProduct) {
//         await FavoriteProducts.destroy({
//           where: {
//             [Op.and]: [
//               { userId: req.body.userId },
//               { productId: req.body.productId }
//             ]
//           }
//         }, { transaction: t })

//         return false
//       } else {
//         await FavoriteProducts.create({
//           userId: req.body.userId,
//           productId: req.body.productId
//         }, { transaction: t })

//         return true
//       }
//     })

//     const response = {
//       updatedToken: req.body.updatedToken,
//       data: {
//         productId: req.body.productId,
//         favorite: isFavorite
//       }
//     }

//     res.status(200).json(response)
//   } catch (error) {
//     console.log(error)
//     res.status(500).json(error)
//   }
// }

const changePinnedParam = async (req: Request, res: Response): Promise<Response> => {
  try {

    // const entityManager = getManager()

    // const test = entityManager.update(
    //   Users,
    //   {
    //     pinnedProducts: {
    //       // userId: req.body.userId,
    //       productId: '2',
    //     }
    //   },
    //   {
    //     pinnedProducts: {
    //       // userId: req.body.userId,
    //       productId: [1, 2],
    //     }
    //   }
    // )

    const response = {
      updatedToken: req.body.updatedToken,
      data: null
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      message: 'Неизвестная ошибка.'
    })
  }
  // try {
  //   const isPinned = await sequelize.transaction( async (t) => {
  //     const pinnedProduct = await PinnedProducts.findOne({
  //       where: {
  //         [Op.and]: [
  //           { userId: req.body.userId },
  //           { productId: req.body.productId }
  //         ]
  //       },
  //     }, { transaction: t })

  //     if (pinnedProduct) {
  //       await PinnedProducts.destroy({
  //         where: {
  //           [Op.and]: [
  //             { userId: req.body.userId },
  //             { productId: req.body.productId }
  //           ]
  //         }
  //       }, { transaction: t })

  //       return false
  //     } else {
  //       await PinnedProducts.create({
  //         userId: req.body.userId,
  //         productId: req.body.productId
  //       }, { transaction: t })

  //       return true
  //     }
  //   })

  //   const response = {
  //     updatedToken: req.body.updatedToken,
  //     data: {
  //       productId: req.body.productId,
  //       pinned: isPinned
  //     }
  //   }

  //   res.status(200).json(response)
  // } catch (error) {
  //   console.log(error)
  //   res.status(500).json(error)
  // }
}

export default {
  getAllProducts,
  changePinnedParam
}
