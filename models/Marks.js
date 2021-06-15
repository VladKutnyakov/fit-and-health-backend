const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')

// Описание модели таблицы в БД MySQL
const Marks = sequelize.define('marks', {
  entityId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  marks: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  }
})

module.exports = Marks
