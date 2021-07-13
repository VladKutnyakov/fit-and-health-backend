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
  },
  marksId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  socialsId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  // mealPartsId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: true
  // }
})

MealPlaner.belongsTo(Marks, {as: 'marks', foreingKey: 'marksId'})
MealPlaner.belongsTo(Socials, {as: 'socials', foreingKey: 'socialsId'})
MealPlaner.hasMany(MealParts, {as: 'mealParts', foreingKey: 'mealPlanerId'})

module.exports = MealPlaner
