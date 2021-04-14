const Sequelize = require('sequelize')
// const Op = Sequelize.Op;
// const errorHandler = require('../utils/errorHandler.js')
const Recipes = require('../models/Recipes')
const Products = require('../models/Products')

module.exports.getRecipe = async function (req, res) {
  try {
    // console.log(req.params.id)
    const tragetRecipeId = req.params.id.split('-')[1]
    // console.log(tragetRecipeId)

    const Recipe = await Recipes.findOne({
      where: {
        id: tragetRecipeId
      }
    })
    Recipe.marks = JSON.parse(Recipe.marks)
    Recipe.media = JSON.parse(Recipe.media)
    Recipe.cookingSteps = JSON.parse(Recipe.cookingSteps)

    // Подготовленные данные о продуктах
    const products = JSON.parse(Recipe.products)

    // Массив с продуктами итерируемого рецепта
    let ProductsFullInfo = []
    for (let i = 0; i < products.length; i++) {
      let ProductInfo = await Products.findOne({
        where: {id: products[i].id}
      })

      // Добавляем данные о весе продукта в рецепте
      ProductInfo.dataValues.weight = products[i].weight

      ProductsFullInfo.push(ProductInfo)
    }

    // Рецепты с полными данными о продуктах
    Recipe.products = ProductsFullInfo

    res.status(200).json(Recipe)
  } catch (err) {
    console.log(err);
  }
}
