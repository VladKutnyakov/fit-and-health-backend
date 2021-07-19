const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')

// const Users = require('./Users')
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
  // Связь с планировщиком рационов
  mealPlanerId: {
    type: DataTypes.INTEGER,
    reference: {
      model: Users,
      key: 'id'
    },
    allowNull: true
  },
  // Связь с сохраненным рационом
  // mealPlanId: {
  //   type: DataTypes.INTEGER,
  //   reference: {
  //     model: Users,
  //     key: 'id'
  //   },
  //   allowNull: true
  // },
  // Связь с сохраненным рационом
  // mealPlanId: {
  //   type: DataTypes.INTEGER,
  //   reference: {
  //     model: Users,
  //     key: 'id'
  //   },
  //   allowNull: true
  // },
}, {
  freezeTableName: true,
  timestamps: false
})

// Users.belongsToMany(Products, { as: 'products', through: FavoriteProducts, foreignKey: 'productId' })
// Products.belongsToMany(Users, { as: 'users', through: FavoriteProducts, foreignKey: 'userId' })

module.exports = AddedMarks
