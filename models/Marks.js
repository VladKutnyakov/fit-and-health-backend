const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')

// Описание модели таблицы в БД MySQL
const Marks = sequelize.define('marks', {
  marks: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  }
})

module.exports = Marks
