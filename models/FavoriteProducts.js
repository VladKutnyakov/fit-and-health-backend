const Sequelize = require('sequelize')
const sequelize = require('../utils/dbConnect')

const Users = require('./Users')
const Products = require('./Products')

// Описание модели таблицы в БД MySQL
const FavoriteProducts = sequelize.define('favorite_products', {
  userId: {
    type: Sequelize.INTEGER,
    reference: {
      model: Users,
      key: 'id'
    },
    allowNull: false
  },
  productId: {
    type: Sequelize.INTEGER,
    reference: {
      model: Products,
      key: 'id'
    },
    allowNull: false
  },
  favorite: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  }
}, { timestamps: false })

Users.belongsToMany(Products, { through: FavoriteProducts, unique: false })
Products.belongsToMany(Users, { through: FavoriteProducts, unique: false })

module.exports = FavoriteProducts
