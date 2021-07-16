const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')
// const Products = require('./Products.js')

// Описание модели таблицы в БД MySQL
const MealPartProducts = sequelize.define('meal_part_products', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
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

// MealPartProducts.hasOne(Products, { as: 'product', foreignKey: 'productId' })

// Products.belongsTo(MealPartProducts)

module.exports = MealPartProducts
