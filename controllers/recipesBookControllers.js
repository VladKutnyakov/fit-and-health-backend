const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const Recipes = require('../models/Recipes')
const Products = require('../models/Products')
const errorHandler = require('../utils/errorHandler')

module.exports.getRecipes = async function (req, res) {

  try {
    // Рецепты с сырыми данными о продуктах
    let ReceivedRecipes = await Recipes.findAll({
      where: {
        [Op.or]: [{userId: null}, {userId: 1}]
      }
    })

    // Подготовленные данные о продуктах
    let ReceivedProducts = []
    for (let i = 0; i < ReceivedRecipes.length; i++) {
      // продукты конкретного рецепта (id и вес)
      const products = JSON.parse(ReceivedRecipes[i].products)

      // Массив с продуктами итерируемого рецепта
      let ProductsFullInfo = []
      for (let i = 0; i < products.length; i++) {
        let ProductInfo = await Products.findOne({
          where: {id: products[i].id}
        })
        // Добавляем данные о весе продукта в рецепте
        ProductInfo.dataValues.weightInRecipe = products[i].weight

        ProductsFullInfo.push(ProductInfo)
      }
      ReceivedProducts.push(ProductsFullInfo)
    }

    // Рецепты с полными данными о продуктах
    for (let i = 0; i < ReceivedRecipes.length; i++) {
      ReceivedRecipes[i].products = ReceivedProducts[i]
    }

    res.status(200).json(ReceivedRecipes)
  } catch (err) {
    errorHandler(err)
  }

}
