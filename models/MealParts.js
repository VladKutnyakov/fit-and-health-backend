const Sequelize = require('sequelize')
const sequelize = require('../utils/dbConnect')

// Описание модели таблицы в БД MySQL
const MealParts = sequelize.define('meal_parts', {
  mealPlanId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: true
  },
  mealTime: {
    type: Sequelize.STRING,
    allowNull: true
  },
  products: {
    type: Sequelize.STRING,
    allowNull: true
  },
  recipes: {
    type: Sequelize.STRING,
    allowNull: true
  },
})

module.exports = MealParts
