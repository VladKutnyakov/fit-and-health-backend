const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')
const Socials = require('./Socials')
const MealParts = require('./MealParts')
const Marks = require('./Marks')
const AddedMarks = require('./AddedMarks')

// Описание модели таблицы в БД MySQL
const MealPlaner = sequelize.define('meal_planers', {
  date: {
    type: DataTypes.STRING,
    allowNull: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  targetProtein: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  targetFats: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  targetCarb: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  targetWeight: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  currentWeight: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  freezeTableName: true,
  timestamps: false
})


MealPlaner.hasOne(Socials, { as: 'socials', foreignKey: 'mealPlanerId' })
MealPlaner.hasMany(MealParts, { as: 'mealParts', foreignKey: 'mealPlanerId' })
MealPlaner.belongsToMany(Marks, { as: 'marks', through: AddedMarks, foreignKey: 'mealPlanerId' })

Marks.belongsToMany(MealPlaner, { as: 'mealPlaners', through: AddedMarks, foreignKey: 'markId' })
Socials.belongsTo(MealPlaner)
MealParts.belongsTo(MealPlaner)

module.exports = MealPlaner
