const Sequelize = require('sequelize')
const sequelize = require('../utils/dbConnect')

// Описание модели таблицы в БД MySQL
const UserParams = sequelize.define('user_params', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  currentWeight: {
    type: Sequelize.FLOAT,
    allowNull: true
  }
})

module.exports = UserParams
