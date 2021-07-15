const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')

// Описание модели таблицы в БД MySQL
const Marks = sequelize.define('marks', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  tags: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  mealPlanerId: {
    type: DataTypes.UUID,
    allowNull: true,
  }
}, {
  freezeTableName: true,
  timestamps: false
})

Marks.associate = (models) => {
  Marks.belongsTo(models.MealPlaner)
}

module.exports = Marks
