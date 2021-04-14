const Sequelize = require('sequelize')

//  Подключение к локальной базе MySQL
const DB_NAME = 'fh'
const USER_NAME = 'mysql'
const USER_PASSWORD = 'mysql'
const sequelize = new Sequelize(DB_NAME, USER_NAME, USER_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize
