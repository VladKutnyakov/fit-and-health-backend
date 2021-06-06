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
  title: {
    type: Sequelize.STRING,
    allowNull: true
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
  marksId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  socialsId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  mealPartsId: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
})

module.exports = MealPlanerInfo
