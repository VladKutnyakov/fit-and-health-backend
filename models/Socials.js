const Sequelize = require('sequelize')
const sequelize = require('../utils/dbConnect')

// Описание модели таблицы в БД MySQL
const Socials = sequelize.define('socials', {
  entityId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  likes: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  dislikes: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  share: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
})

module.exports = Socials
