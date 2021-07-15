const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')

// Описание модели таблицы в БД MySQL
const MealParts = sequelize.define('meal_parts', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  mealTime: {
    type: DataTypes.STRING,
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

MealParts.associate = (models) => {
  MealParts.belongsTo(models.MealPlaner)
  MealParts.hasMany(models.MealPartProducts, { as: 'products', foreignKey: 'mealPartId' })
}

module.exports = MealParts
