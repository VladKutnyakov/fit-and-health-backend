const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')
const Tokens = require('./Tokens')
const UserParams = require('./UserParams')

// Описание модели таблицы в БД MySQL
const Users = sequelize.define('users', {
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // phone: {
  //   type: DataTypes.STRING,
  //   allowNull: true
  // },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  },
})

Users.hasMany(Tokens, {
  foreignKey: 'userId'
})

Users.hasOne(UserParams, {
  foreignKey: 'userId'
})

module.exports = Users
