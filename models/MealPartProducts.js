const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')

// Описание модели таблицы в БД MySQL
const MealPartProducts = sequelize.define('meal_part_products', {
  id: {
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.INTEGER,
    primaryKey: true
  },
  currentWeight: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  freezeTableName: true,
  timestamps: false
})

module.exports = MealPartProducts
