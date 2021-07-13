const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')
// const MealPlaner = require('./MealPlaner')

// Описание модели таблицы в БД MySQL
const MealParts = sequelize.define('meal_parts', {
  mealPlanerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    // references: {
    //   model: MealPlaner,
    //   key: "id"
    // }
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

// MealParts.belongsTo(MealPlaner)

module.exports = MealParts
