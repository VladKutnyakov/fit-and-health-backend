import { Request, Response } from "express"
import { getManager } from "typeorm"
import { Products } from "../db/entities/Products"

const getAllProducts = async (req: Request, res: Response): Promise<Response> => {
  const entityManager = getManager()

  const AllProducts = await entityManager.find(
    Products,
    // {
      // where: {
      //   user: {
      //     id: req.params.profileId
      //   }
      // }
    // }
  )

  console.log(AllProducts)

  const response = {
    updatedToken: req.body.updatedToken,
    data: AllProducts
  }

  return res.status(200).json(response)
  // try {
  //   const products = await sequelize.transaction( async (t) => {
  //     const AllProducts = await Products.findAll({
  //       where: {
  //         [Op.or]: [
  //           { userId: null }, // получить все базовые продукты (id null)
  //           { userId: req.body.userId } // получить продукты пользователя по его id
  //         ]
  //       },
  //       attributes: {
  //         exclude: ['createdAt', 'updatedAt']
  //       },
  //       raw: true
  //     }, { transaction: t })

  //     const UserFavoriteProducts = await FavoriteProducts.findAll({
  //       where: {
  //         userId: req.body.userId // получить продукты которые пользователь отметил как избранные
  //       },
  //       raw: true
  //     }, { transaction: t })

  //     const UserPinnedProducts = await PinnedProducts.findAll({
  //       where: {
  //         userId: req.body.userId // получить продукты которые пользователь отметил как избранные
  //       },
  //       raw: true
  //     }, { transaction: t })

  //     for (let i = 0; i < AllProducts.length; i++) {
  //       // Добавляем параметр "избранный" и "закрепленый" для продукта
  //       AllProducts[i].favorite = false
  //       AllProducts[i].pinned = false

  //       // Проверяем и обновляем параметр "избранный продукт"
  //       UserFavoriteProducts.forEach((element) => {
  //         if (element.productId === AllProducts[i].id) {
  //           AllProducts[i].favorite = true
  //         }
  //       })

  //       // Проверяем и обновляем параметр "закрепленый продукт"
  //       UserPinnedProducts.forEach((element) => {
  //         if (element.productId === AllProducts[i].id) {
  //           AllProducts[i].pinned = true
  //         }
  //       })
  //     }

  //     return AllProducts
  //   })

  //   const response = {
  //     updatedToken: req.body.updatedToken,
  //     data: products
  //   }

  //   res.status(200).json(response)
  // } catch (error) {
  //   console.log(error)
  //   res.status(500).json(error)
  // }
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

// module.exports.changePinnedParam = async function (req, res) {
//   try {
//     const isPinned = await sequelize.transaction( async (t) => {
//       const pinnedProduct = await PinnedProducts.findOne({
//         where: {
//           [Op.and]: [
//             { userId: req.body.userId },
//             { productId: req.body.productId }
//           ]
//         },
//       }, { transaction: t })

//       if (pinnedProduct) {
//         await PinnedProducts.destroy({
//           where: {
//             [Op.and]: [
//               { userId: req.body.userId },
//               { productId: req.body.productId }
//             ]
//           }
//         }, { transaction: t })

//         return false
//       } else {
//         await PinnedProducts.create({
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
//         pinned: isPinned
//       }
//     }

//     res.status(200).json(response)
//   } catch (error) {
//     console.log(error)
//     res.status(500).json(error)
//   }
// }

export default {
  getAllProducts
}
