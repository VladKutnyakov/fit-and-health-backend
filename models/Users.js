const Sequelize = require('sequelize')
const sequelize = require('../utils/dbConnect')

// Описание модели таблицы в БД MySQL
const Users = sequelize.define('users', {
  // id: {
  //   primaryKey: true,
  //   autoIncrement: true,
  //   allowNull: false,
  //   type: Sequelize.INTEGER
  // },
  email: {
    type: Sequelize.STRING,
    allowNull: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

module.exports = Users
