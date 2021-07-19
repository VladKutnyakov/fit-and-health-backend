const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')

// Описание модели таблицы в БД MySQL
const UserSettings = sequelize.define('user_settings', {
  id: {
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.INTEGER,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
}, {
  freezeTableName: true,
  timestamps: false
})

module.exports = UserSettings
