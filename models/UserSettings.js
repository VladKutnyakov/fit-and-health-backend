const Sequelize = require('sequelize')
const sequelize = require('../utils/dbConnect')

// Описание модели таблицы в БД MySQL
const UserSettings = sequelize.define('user_settings', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  targetProtein: {
    type: Sequelize.FLOAT,
    allowNull: true
  },
  targetFats: {
    type: Sequelize.FLOAT,
    allowNull: true
  },
  targetCarb: {
    type: Sequelize.FLOAT,
    allowNull: true
  },
  targetWeight: {
    type: Sequelize.FLOAT,
    allowNull: true
  }
})

module.exports = UserSettings
