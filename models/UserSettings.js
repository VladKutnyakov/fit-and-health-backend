const Sequelize = require('sequelize')
const sequelize = require('../utils/dbConnect')

// Описание модели таблицы в БД MySQL
const UserSettings = sequelize.define('user_settings', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
})

module.exports = UserSettings
