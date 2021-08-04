const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')
const MealPartProducts = require('./MealPartProducts')

// Описание модели таблицы в БД MySQL
const MealParts = sequelize.define('meal_parts', {
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  mealTime: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  freezeTableName: true,
  timestamps: false
})

MealParts.hasMany(MealPartProducts, { as: 'products', foreignKey: 'mealPartId' })
MealPartProducts.belongsTo(MealParts)

module.exports = MealParts
