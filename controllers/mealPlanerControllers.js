const Sequelize = require('sequelize')
const sequelize = require('../utils/dbConnect')
const Op = Sequelize.Op;
const MealPlanerInfo = require('../models/MealPlanerInfo')

// Формат даты для всего проекта --- 2021-12-29

module.exports.getMealPlanerInfo = async function (req, res) {
  try {
    const mealPlanDayInfo = await sequelize.transaction( async (t) => {
      if (req.query && req.query.date) {
        // Поиск плана питания на день в соответствие с указанной датой
        const mealPlan = await MealPlanerInfo.findOne({
          where: {
            [Op.and]: [
              { userId: req.body.userId },
              { date: new Date(req.query.date).getTime() / 1000 } // переданная дата (строка) приведенная в милесекунды
            ]
          },
        }, { transaction: t })

        if (mealPlan) {
          // Вернуть данные о найденном плане питания на указанный день
          return mealPlan
        } else {
          return false
        }
      } else {
        const currentDate = new Date().toJSON().split('T')[0]
        // Поиск текущей даты, если дата не указана
        const mealPlan = await MealPlanerInfo.findOne({
          where: {
            [Op.and]: [
              { userId: req.body.userId },
              { date: new Date(currentDate).getTime() / 1000 } // текущая дата в милисекундах
            ]
          },
        }, { transaction: t })

        if (mealPlan) {
          // Вернуть данные о найденном плане питания на текущий день
          return mealPlan
        } else {
  
          return false
        }
      }
    })

    const response = {
      updatedToken: req.body.updatedToken,
      data: {
        mealPlanerInfo: mealPlanDayInfo
      }
    }
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
