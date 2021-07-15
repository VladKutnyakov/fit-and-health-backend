const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')

const Users = require('./Users')
const Products = require('./Products')

// Описание модели таблицы в БД MySQL
const FavoriteProducts = sequelize.define('favorite_products', {
  userId: {
    type: DataTypes.UUID,
    reference: {
      model: Users,
      key: 'id'
    },
    allowNull: false
  },
  productId: {
    type: DataTypes.UUID,
    reference: {
      model: Products,
      key: 'id'
    },
    allowNull: false
  }
}, {
  freezeTableName: false,
  timestamps: false
})

Users.belongsToMany(Products, { as: 'products', through: FavoriteProducts, foreignKey: 'productId' })
Products.belongsToMany(Users, { as: 'users', through: FavoriteProducts, foreignKey: 'userId' })

module.exports = FavoriteProducts
