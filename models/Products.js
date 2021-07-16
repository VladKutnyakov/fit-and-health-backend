const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')
// const MealPartProducts = require('./MealPartProducts')

// Описание модели таблицы в БД MySQL
const Products = sequelize.define('products', {
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  protein: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  fats: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  carb: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  kkal: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
})

// Products.hasMany(MealPartProducts, { as: 'mealPartProducts', foreignKey: 'mealPartProductsId' })

module.exports = Products
