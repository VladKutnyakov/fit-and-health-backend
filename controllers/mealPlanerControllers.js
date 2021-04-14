const errorHandler = require('../utils/errorHandler.js')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const MealPlaner = require('../models/MealPlaner')
const jwt = require('jsonwebtoken')
const keys = require('../keys')

module.exports.getMealPlanerInfo = async function (req, res) {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1]
      const decodedToken = jwt.verify(token, keys.jwt)

      // Дата по которой искать данные в БД для дневника питания
      let MealPlanerTargetDay = req.query.date
      // const CurrentDate = new Date().toISOString().split('T')[0]
      if (MealPlanerTargetDay === 'undefined') {
        MealPlanerTargetDay = new Date().toISOString().split('T')[0]
      }

      console.log(MealPlanerTargetDay)

      // MealPlaner.findOne({
      //   where: {
      //     userId: decodedToken.userId,
      //     date: mealPlanerTargetDay
      //   }
      // }).then(info => console.log(info))

      res.status(200).json({
        message: 'test message'
      })

    } else {
      res.status(401).json({message: 'Необходима авторизация'})
    }

  } catch (err) {
    errorHandler(res, err)
  }
}

