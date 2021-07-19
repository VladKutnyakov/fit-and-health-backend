const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')
const Tokens = require('./Tokens')
const UserParams = require('./UserParams')

// Описание модели таблицы в БД MySQL
const Users = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.INTEGER,
    primaryKey: true
  },
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
}, {
  freezeTableName: true,
  timestamps: false
})

Users.hasMany(Tokens, {
  foreignKey: 'userId'
})

Users.hasOne(UserParams, {
  foreignKey: 'userId'
})

module.exports = Users
