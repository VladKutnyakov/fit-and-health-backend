const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')
const Tokens = require('./Tokens')

// Описание модели таблицы в БД MySQL
const Users = sequelize.define('users', {
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  },
})

Users.hasMany(Tokens, {
  foreignKey: 'userId'
})

module.exports = Users
