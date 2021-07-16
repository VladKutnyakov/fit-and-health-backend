const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')

const Products = require('./Products')
const MealPartProducts = require('./Users')

// Описание модели таблицы в БД MySQL
const ProductInMealPart = sequelize.define('product_in_meal_part', {
  productId: {
    type: DataTypes.UUID,
    reference: {
      model: Products,
      key: 'id'
    },
    allowNull: false
  },
  mealPartProductId: {
    type: DataTypes.UUID,
    reference: {
      model: MealPartProducts,
      key: 'id'
    },
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: false
})

MealPartProducts.belongsToMany(Products, { as: 'productsInMealPart', through: ProductInMealPart, foreignKey: 'productId' })
Products.belongsToMany(MealPartProducts, { as: 'productsInMealPart', through: ProductInMealPart, foreignKey: 'mealPartProductId' })

module.exports = ProductInMealPart
