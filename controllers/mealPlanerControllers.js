const Sequelize = require('sequelize')
const sequelize = require('../utils/dbConnect')
const Op = Sequelize.Op;
const MealPlanerInfo = require('../models/MealPlanerInfo')

module.exports.getMealPlanerInfo = async function (req, res) {
  try {
    const mealPlanDayInfo = await sequelize.transaction( async (t) => {

      if (req.query && req.query.date) {
        // Поиск плана питания на день в соответствие с указанной датой
        const mealPlan = await MealPlanerInfo.findOne({
          where: {
            [Op.and]: [
              { userId: req.body.userId },
              { date: new Date(req.query.date).toLocaleDateString() }
            ]
          },
        }, { transaction: t })

        if (mealPlan) {
          // Вернуть данные о найденном плане питания на указанный день
          return mealPlan
        } else {
          // Создать пустую запись для указанной даты
          const newMealPlan = await MealPlanerInfo.create({
            userId: req.body.userId,
            date: new Date(req.query.date).toLocaleDateString(),
            targetProtein: null,
            targetFats: null,
            targetCarb: null,
            targetWeight: null,
            title: '',
            description: '',
            marks: null,
            social: null,
            mealParts: null
          }, { transaction: t })

          return newMealPlan
        }
      } else {
        // Поиск текущей даты, если дата не указана
        const mealPlan = await MealPlanerInfo.findOne({
          where: {
            [Op.and]: [
              { userId: req.body.userId },
              { date: new Date().toLocaleDateString() }
            ]
          },
        }, { transaction: t })

        if (mealPlan) {
          // Вернуть данные о найденном плане питания на текущий день
          return mealPlan
        } else {
          // Создать и вернуть новую запись на текущий день
          const newMealPlan = await MealPlanerInfo.create({
            userId: req.body.userId,
            date: new Date().toLocaleDateString(),
            targetProtein: null,
            targetFats: null,
            targetCarb: null,
            targetWeight: null,
            title: '',
            description: '',
            marks: null,
            social: null,
            mealParts: null
          }, { transaction: t })
  
          return newMealPlan
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

