const Sequelize = require('sequelize')
const sequelize = require('../utils/dbConnect')

// Описание модели таблицы в БД MySQL
const MealPlanerInfo = sequelize.define('meal_planer_info', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  date: {
    type: Sequelize.STRING,
    allowNull: true
  },
  targetProtein: {
    type: Sequelize.FLOAT,
    allowNull: true
  },
  targetFats: {
    type: Sequelize.FLOAT,
    allowNull: true
  },
  targetCarb: {
    type: Sequelize.FLOAT,
    allowNull: true
  },
  targetWeight: {
    type: Sequelize.FLOAT,
    allowNull: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: true
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
  marks: {
    type: Sequelize.STRING,
    allowNull: true
  },
  social: {
    type: Sequelize.STRING,
    allowNull: true
  },
  mealParts: {
    type: Sequelize.TEXT,
    allowNull: true
  }
})

module.exports = MealPlanerInfo
