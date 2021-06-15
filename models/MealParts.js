const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')

// Описание модели таблицы в БД MySQL
const MealParts = sequelize.define('meal_parts', {
  mealPlanId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  mealTime: {
    type: DataTypes.STRING,
    allowNull: true
  },
  products: {
    type: DataTypes.STRING,
    allowNull: true
  },
  recipes: {
    type: DataTypes.STRING,
    allowNull: true
  },
})

module.exports = MealParts
