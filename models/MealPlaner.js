const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')
const Marks = require('./Marks')
const Socials = require('./Socials')
const MealParts = require('./MealParts')

// Описание модели таблицы в БД MySQL
const MealPlaner = sequelize.define('meal_planer', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  date: {
    type: DataTypes.STRING,
    allowNull: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  targetProtein: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  targetFats: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  targetCarb: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  targetWeight: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  currentWeight: {
    type: DataTypes.FLOAT,
    allowNull: true
  }
})

MealPlaner.hasOne(Marks, { as: 'marks', foreignKey: 'mealPlanerId' })
MealPlaner.hasOne(Socials, { as: 'socials', foreignKey: 'mealPlanerId' })
MealPlaner.hasMany(MealParts, { as: 'mealParts', foreignKey: 'mealPlanerId' })

module.exports = MealPlaner
