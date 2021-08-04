const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')

// Описание модели таблицы в БД MySQL
const Tokens = sequelize.define('tokens', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  accessToken: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  refreshToken: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
}, {
  freezeTableName: true,
  timestamps: false
})

module.exports = Tokens
