const Sequelize = require('sequelize')
const sequelize = require('../utils/dbConnect')

// Описание модели таблицы в БД MySQL
const Users = sequelize.define('users', {
  email: {
    type: Sequelize.STRING,
    allowNull: true
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true
  },
  token: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  refreshToken: {
    type: Sequelize.TEXT,
    allowNull: true
  }
})

module.exports = Users
