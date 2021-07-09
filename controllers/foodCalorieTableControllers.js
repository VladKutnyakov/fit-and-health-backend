const Sequelize = require('sequelize')
const sequelize = require('../utils/dbConnect')
const Op = Sequelize.Op;
const Products = require('../models/Products')
const FavoriteProducts = require('../models/FavoriteProducts')
const PinnedProducts = require('../models/PinnedProducts')

module.exports.getAllProducts = async function (req, res) {
  try {
    const products = await sequelize.transaction( async (t) => {
      const AllProducts = await Products.findAll({
        where: {
          [Op.or]: [
            { userId: null }, // получить все базовые продукты (id null)
            { userId: req.body.userId } // получить продукты пользователя по его id
          ]
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        raw: true
      }, { transaction: t })

      const UserFavoriteProducts = await FavoriteProducts.findAll({
        where: {
          userId: req.body.userId // получить продукты которые пользователь отметил как избранные
        },
        raw: true
      }, { transaction: t })

      const UserPinnedProducts = await PinnedProducts.findAll({
        where: {
          userId: req.body.userId // получить продукты которые пользователь отметил как избранные
        },
        raw: true
      }, { transaction: t })

      for (let i = 0; i < AllProducts.length; i++) {
        // Добавляем параметр "избранный" и "закрепленый" для продукта
        AllProducts[i].favorite = false
        AllProducts[i].pinned = false

        // Проверяем и обновляем параметр "избранный продукт"
        UserFavoriteProducts.forEach((element) => {
          if (element.productId === AllProducts[i].id) {
            AllProducts[i].favorite = true
          }
        })

        // Проверяем и обновляем параметр "закрепленый продукт"
        UserPinnedProducts.forEach((element) => {
          if (element.productId === AllProducts[i].id) {
            AllProducts[i].pinned = true
          }
        })
      }

      return AllProducts
    })

    const response = {
      updatedToken: req.body.updatedToken,
      data: products
    }

    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

module.exports.saveNewProduct = async function (req, res) {
  try {
    const product = await sequelize.transaction( async (t) => {
      const savedProduct = await Products.create({
        title: req.body.title,
        weight: req.body.weight,
        protein: req.body.protein,
        fats: req.body.fats,
        carb: req.body.carb,
        kkal: req.body.kkal,
        category: req.body.category,
        userId: req.body.userId,
      }, { transaction: t })

      if (req.body.favorite) {
        await FavoriteProducts.create({
          userId: req.body.userId,
          productId: savedProduct.dataValues.id
        }, { transaction: t })
      }

      return savedProduct
    })

    const response = {
      updatedToken: req.body.updatedToken,
      data: {
        product: product,
        favorite: req.body.favorite
      }
    }

    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

module.exports.removeProduct = async function (req, res) {
  try {
    const RemoveProduct = await Products.destroy({
      where: {
        [Op.and]: [
          {id: req.body.productId},
          {userId: req.body.userId}
        ]
      }
    })

    const response = {
      updatedToken: req.body.updatedToken,
      data: {
        removed: RemoveProduct > 0 ? true : false,
        productId: req.body.productId
      }
    }

    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

module.exports.changeFavoriteParam = async function (req, res) {
  try {
    const isFavorite = await sequelize.transaction( async (t) => {
      const favoriteProduct = await FavoriteProducts.findOne({
        where: {
          [Op.and]: [
            { userId: req.body.userId },
            { productId: req.body.productId }
          ]
        },
      }, { transaction: t })

      if (favoriteProduct) {
        await FavoriteProducts.destroy({
          where: {
            [Op.and]: [
              { userId: req.body.userId },
              { productId: req.body.productId }
            ]
          }
        }, { transaction: t })

        return false
      } else {
        await FavoriteProducts.create({
          userId: req.body.userId,
          productId: req.body.productId
        }, { transaction: t })

        return true
      }
    })

    const response = {
      updatedToken: req.body.updatedToken,
      data: {
        productId: req.body.productId,
        favorite: isFavorite
      }
    }

    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

module.exports.changePinnedParam = async function (req, res) {
  try {
    const isPinned = await sequelize.transaction( async (t) => {
      const pinnedProduct = await PinnedProducts.findOne({
        where: {
          [Op.and]: [
            { userId: req.body.userId },
            { productId: req.body.productId }
          ]
        },
      }, { transaction: t })

      if (pinnedProduct) {
        await PinnedProducts.destroy({
          where: {
            [Op.and]: [
              { userId: req.body.userId },
              { productId: req.body.productId }
            ]
          }
        }, { transaction: t })

        return false
      } else {
        await PinnedProducts.create({
          userId: req.body.userId,
          productId: req.body.productId
        }, { transaction: t })

        return true
      }
    })

    const response = {
      updatedToken: req.body.updatedToken,
      data: {
        productId: req.body.productId,
        pinned: isPinned
      }
    }

    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
