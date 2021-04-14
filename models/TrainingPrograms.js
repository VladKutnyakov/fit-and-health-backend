const Sequelize = require('sequelize')
const sequelize = require('../utils/dbConnect')

// Описание модели таблицы в БД MySQL
const TrainingPrograms = sequelize.define('training_programs', {
  title: {
    type: Sequelize.STRING,
    allowNull: true
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
  trainingDays: {
    type: Sequelize.STRING,
    allowNull: true
  },

  addedMarks: {
    type: Sequelize.STRING,
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
  shares: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  // comments: {},
  views: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  addToFavorite: {
    type: Sequelize.INTEGER,
    allowNull: true
  },

  userId: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
})

module.exports = TrainingPrograms
