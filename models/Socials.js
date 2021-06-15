const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')

// Описание модели таблицы в БД MySQL
const Socials = sequelize.define('socials', {
  entityId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  dislikes: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  share: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
})

module.exports = Socials
