const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')

// Описание модели таблицы в БД MySQL
const UserParams = sequelize.define('user_params', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  middleName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true
  },
  birthday: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  height: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  site: {
    type: DataTypes.STRING,
    allowNull: true
  },
  vk: {
    type: DataTypes.STRING,
    allowNull: true
  },
  facebook: {
    type: DataTypes.STRING,
    allowNull: true
  },
  instagram: {
    type: DataTypes.STRING,
    allowNull: true
  },
  youtube: {
    type: DataTypes.STRING,
    allowNull: true
  },
  twitter: {
    type: DataTypes.STRING,
    allowNull: true
  },
  skype: {
    type: DataTypes.STRING,
    allowNull: true
  },
  subscriptions: {
    type: DataTypes.TEXT('large'),
    allowNull: true
  },
  subscribers: {
    type: DataTypes.TEXT('large'),
    allowNull: true
  },
  sportDirections: {
    type: DataTypes.TEXT('large'),
    allowNull: true
  },
})

module.exports = UserParams
