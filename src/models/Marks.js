const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')

// Описание модели таблицы в БД MySQL
const Marks = sequelize.define('marks', {
  tag: {
    type: DataTypes.STRING,
    allowNull: false
  },
  entityType: {
    type: DataTypes.STRING,  // mealPlaner, trainingProgram, ..., по типу сущности
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: false
})

module.exports = Marks
