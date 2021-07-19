const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')

const MealPlaner = require('./MealPlaner')
const Marks = require('./Marks')

// Описание модели таблицы в БД MySQL
const AddedMarks = sequelize.define('added_marks', {
  markId: {
    type: DataTypes.INTEGER,
    reference: {
      model: Marks,
      key: 'id'
    },
    allowNull: false
  },
  mealPlanerId: {
    type: DataTypes.INTEGER,
    reference: {
      model: MealPlaner,
      key: 'id'
    },
    allowNull: true
  },
}, {
  freezeTableName: true,
  timestamps: false
})

module.exports = AddedMarks
