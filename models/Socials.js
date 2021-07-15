const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')

// Описание модели таблицы в БД MySQL
const Socials = sequelize.define('socials', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  dislikes: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  share: {
    type: DataTypes.INTEGER,
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

Socials.associate = (models) => {
  Socials.belongsTo(models.MealPlaner)
}

module.exports = Socials
