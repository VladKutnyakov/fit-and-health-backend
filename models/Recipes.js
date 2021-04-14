const Sequelize = require('sequelize')
const sequelize = require('../utils/dbConnect')

// Описание модели таблицы в БД MySQL
const Recipes = sequelize.define('recipes', {
  title: {
    type: Sequelize.STRING,
    allowNull: true
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
  cookingTimes: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  cookingSkill: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  portions: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  likes: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  dislikes: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  shares: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  marks: {
    type: Sequelize.STRING,
    allowNull: true
  },
  media: {
    type: Sequelize.STRING,
    allowNull: true
  },
  products: {
    type: Sequelize.STRING,
    allowNull: true
  },
  cookingSteps: {
    type: Sequelize.STRING,
    allowNull: true
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
})

module.exports = Recipes
