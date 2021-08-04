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
    allowNull: false
  },
  productId: {
    type: DataTypes.INTEGER,
    reference: {
      model: Products,
      key: 'id'
    },
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: false
})

Users.belongsToMany(Products, { as: 'products', through: FavoriteProducts, foreignKey: 'productId' })
Products.belongsToMany(Users, { as: 'users', through: FavoriteProducts, foreignKey: 'userId' })

module.exports = FavoriteProducts
