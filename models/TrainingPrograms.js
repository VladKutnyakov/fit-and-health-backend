const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')

// Описание модели таблицы в БД MySQL
const TrainingPrograms = sequelize.define('training_programs', {
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  trainingDays: {
    type: DataTypes.STRING,
    allowNull: true
  },

  addedMarks: {
    type: DataTypes.STRING,
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
  shares: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  // comments: {},
  views: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  addToFavorite: {
    type: DataTypes.INTEGER,
    allowNull: true
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
})

module.exports = TrainingPrograms
