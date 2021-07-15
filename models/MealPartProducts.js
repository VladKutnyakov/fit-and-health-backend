const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')
// const Products = require('./Products')

// Описание модели таблицы в БД MySQL
const MealPartProducts = sequelize.define('meal_part_products', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  // productId: {
  //   type: DataTypes.UUID,
  //   reference: {
  //     model: Products,
  //     key: 'id'
  //   },
  //   allowNull: false
  // },
  currentWeight: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mealPartId: {
    type: DataTypes.UUID,
    allowNull: false,
  }
}, {
  freezeTableName: true,
  timestamps: false
})

MealPartProducts.associate = (models) => {
  MealPartProducts.belongsTo(models.MealParts)
}

module.exports = MealPartProducts
