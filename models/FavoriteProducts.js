const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')

const Users = require('./Users')
const Products = require('./Products')

// Описание модели таблицы в БД MySQL
const FavoriteProducts = sequelize.define('favorite_products', {
  userId: {
    type: DataTypes.INTEGER,
    reference: {
      model: Users,
      key: 'id'
    },
    allowNull: false,
    unique: true
  },
  productId: {
    type: DataTypes.INTEGER,
    reference: {
      model: Products,
      key: 'id'
    },
    allowNull: false,
    unique: true
  }
}, { timestamps: false })

Users.belongsToMany(Products, { through: FavoriteProducts, foreignkey: 'userId' })
Products.belongsToMany(Users, { through: FavoriteProducts, foreignkey: 'userId' })

module.exports = FavoriteProducts
