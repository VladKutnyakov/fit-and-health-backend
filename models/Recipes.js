const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')

// Описание модели таблицы в БД MySQL
const Recipes = sequelize.define('recipes', {
  id: {
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.INTEGER,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cookingTimes: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  cookingSkill: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  portions: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  dislikes: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  shares: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  marks: {
    type: DataTypes.STRING,
    allowNull: true
  },
  media: {
    type: DataTypes.STRING,
    allowNull: true
  },
  products: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cookingSteps: {
    type: DataTypes.STRING,
    allowNull: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  freezeTableName: true,
  timestamps: false
})

module.exports = Recipes
