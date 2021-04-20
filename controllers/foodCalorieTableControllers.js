const Sequelize = require('sequelize')
const sequelize = require('../utils/dbConnect')
const Op = Sequelize.Op;
const Products = require('../models/Products')
const FavoriteProducts = require('../models/FavoriteProducts')
const jwt = require('jsonwebtoken')
const keys = require('../keys')

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
        }
      }, { transaction: t })

      const UserFavoriteProducts = await FavoriteProducts.findAll({
        where: {
          userId: req.body.userId // получить продукты которые пользователь отметил как избранные
        }
      }, { transaction: t })

      for (let i = 0; i < AllProducts.length; i++) {
        UserFavoriteProducts.forEach((element) => {
          if (element.dataValues.productId === AllProducts[i].dataValues.id) {
            AllProducts[i].dataValues.favorite = true
          } else {
            AllProducts[i].dataValues.favorite = false
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
  }
}

module.exports.saveNewProduct = async function (req, res) {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1]
      const decodedToken = jwt.verify(token, keys.jwt)

      if (req.body.id && req.body.userId === decodedToken.userId) {
        const UpdatedProduct = await Products.update(
          {
            title: req.body.title,
            weight: req.body.weight,
            protein: req.body.protein,
            fats: req.body.fats,
            carb: req.body.carb,
            kkal: req.body.kkal,
            category: req.body.category,
            favorite: req.body.favorite,
            userProduct: req.body.userProduct,
          },
          {
            where: {
              [Op.and]: [{id: req.body.id}, {userId: decodedToken.userId}]
            }
          }
        )
        res.status(200).json(UpdatedProduct[0])
      } else {
        const CreatedProduct = await Products.create({
          title: req.body.title,
          weight: req.body.weight,
          protein: req.body.protein,
          fats: req.body.fats,
          carb: req.body.carb,
          kkal: req.body.kkal,
          category: req.body.category,
          favorite: req.body.favorite,
          userProduct: req.body.userProduct,
          userId: decodedToken.userId
        })
        res.status(200).json(CreatedProduct)
      }
    } else {
      res.status(401).json({message: 'Необходима авторизация'})
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports.removeProduct = async function (req, res) {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1]
      const decodedToken = jwt.verify(token, keys.jwt)

      const RemoveProduct = await Products.destroy({
        where: {
          [Op.and]: [{id: req.body.product}, {userId: decodedToken.userId}]
        }
      })

      res.status(200).json(RemoveProduct)
    } else {
      res.status(401).json({message: 'Необходима авторизация'})
    }
  } catch (error) {
    console.log(error)
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
  }
}
