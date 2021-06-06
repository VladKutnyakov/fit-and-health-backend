const Sequelize = require('sequelize')
const sequelize = require('../utils/dbConnect')

// Описание модели таблицы в БД MySQL
const Marks = sequelize.define('marks', {
  entityId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  marks: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

module.exports = Marks
