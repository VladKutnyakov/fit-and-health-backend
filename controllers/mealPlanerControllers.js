const Sequelize = require('sequelize')
const sequelize = require('../utils/dbConnect')
const Op = Sequelize.Op;
const MealPlanerInfo = require('../models/MealPlanerInfos')
const Marks = require('../models/Marks')
const Socials = require('../models/Socials')
const UserSettings = require('../models/UserSettings')
const UserParams = require('../models/UserParams')
const MealParts = require('../models/MealParts')
const Products = require('../models/Products')

// Формат даты для всего проекта --- 2021-12-29

module.exports.getMealPlanerInfo = async function (req, res) {
  // console.log(new Date(req.query.date).getTime() / 1000);
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

        // Вернуть данные о найденном плане питания на указанный день
        if (mealPlan) {
          // Получить данные о добавленных отметках
          const mealPlanMarks = await Marks.findOne({
            where: {
              [Op.and]: [
                { id: mealPlan.dataValues.marksId },
                { entityId: mealPlan.dataValues.id }
              ]
            },
            attributes: ['marks']
          }, { transaction: t })

          // Получить данные о социальной активности
          const mealPlanSocials = await Socials.findOne({
            where: {
              [Op.and]: [
                { id: mealPlan.dataValues.socialsId },
                { entityId: mealPlan.dataValues.id }
              ]
            },
            attributes: ['likes', 'dislikes', 'share']
          }, { transaction: t })

          // Получить данные о пользовательских настройках для рациона
          const userTargetSettings = await UserSettings.findOne({
            where: {
              userId: req.body.userId
            },
            attributes: ['targetProtein', 'targetFats', 'targetCarb', 'targetWeight']
          }, { transaction: t })

          // Получить данные о параетрах пользователя
          const userParams = await UserParams.findAll({
            where: {
              userId: req.body.userId
            },
            limit: 10,
            order: [
              ['id', 'DESC'],
            ],
            attributes: ['currentWeight']
          }, { transaction: t })

          const currentWeight = []
          userParams.forEach(element => {
            currentWeight.push(element.dataValues.currentWeight)
          })

          // Получить данные о приемах пищи для плана питания на сутки
          const mealParts = await MealParts.findAll({
            where: {
              mealPlanId: mealPlan.dataValues.id
            },
            attributes: ['title', 'mealTime', 'products', 'recipes']
          }, { transaction: t })

          const mealPlanMealParts = []
          mealParts.forEach(element => {
            const item = {
              title: element.dataValues.title,
              mealTime: element.dataValues.mealTime,
              products: JSON.parse(element.dataValues.products),
              recipes: JSON.parse(element.dataValues.recipes),
            }
            mealPlanMealParts.push(item)
          })

          // Сформировать зарос с данными о продуктах
          const allProductsIds = new Set()
          mealPlanMealParts.forEach(element => {
            element.products.forEach(item => {
              allProductsIds.add(item.id)
            })
          })
          const productsIds = [...allProductsIds]

          const productParams = []
          productsIds.forEach(element => {
            productParams.push({id: element})
          })

          const foundingProducts = await Products.findAll({
            where: {
              [Op.or]: productParams
            },
            attributes: ['id', 'title', 'weight', 'protein', 'fats', 'carb', 'kkal', 'category', 'userId']
          }, { transaction: t })

          mealPlanMealParts.forEach(element => {
            for (let i = 0; i < element.products.length; i++) {
              foundingProducts.forEach(item => {
                if (item.dataValues.id === element.products[i].id) {
                  element.products[i] = {...item.dataValues, weight: element.products[i].currentWeight}
                }
              })
            }
          })

          const targetMealPlanInfo = {
            id: mealPlan.dataValues.id,
            date: new Date(mealPlan.dataValues.date * 1000).toJSON().split('T')[0],
            title: mealPlan.dataValues.title,
            description: mealPlan.dataValues.description,
            targetProtein: userTargetSettings.dataValues.targetProtein,
            targetFats: userTargetSettings.dataValues.targetFats,
            targetCarb: userTargetSettings.dataValues.targetCarb,
            targetWeight: userTargetSettings.dataValues.targetWeight,
            currentWeight: currentWeight.reverse(),
            marks: JSON.parse(mealPlanMarks.dataValues.marks),
            likes: mealPlanSocials.dataValues.likes,
            dislikes: mealPlanSocials.dataValues.dislikes,
            share: mealPlanSocials.dataValues.share,
            mealParts: mealPlanMealParts
          }
          // console.log(targetMealPlanInfo.mealParts[0].products)

          return targetMealPlanInfo
        } else {
          return false
        }
      } else {
        // Поиск текущей даты, если дата не указана
        const currentDate = new Date().toJSON().split('T')[0]

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

          const mealPlanMarks = await Marks.findOne({
            where: {
              [Op.and]: [
                { id: mealPlan.dataValues.marksId },
                { entityId: mealPlan.dataValues.id }
              ]
            },
          }, { transaction: t })

          const mealPlanSocials = await Socials.findOne({
            where: {
              [Op.and]: [
                { id: mealPlan.dataValues.socialsId },
                { entityId: mealPlan.dataValues.id }
              ]
            },
          }, { transaction: t })

          const targetMealPlanInfo = {
            id: mealPlan.dataValues.id,
            date: new Date(mealPlan.dataValues.date * 1000).toJSON().split('T')[0],
            title: mealPlan.dataValues.title,
            description: mealPlan.dataValues.description,
            marks: JSON.parse(mealPlanMarks.dataValues.marks),
            likes: mealPlanSocials.dataValues.likes,
            dislikes: mealPlanSocials.dataValues.dislikes,
            share: mealPlanSocials.dataValues.share,
            mealParts: [
              {
                title: 'Затрак',
                mealTime: '07:00',
                recipes: [],
                products: []
              },
            ]
          }

          return targetMealPlanInfo
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

module.exports.saveMealPlanerInfo = async function (req, res) {
  try {
    // console.log(req.body)

    const candidate = await MealPlanerInfo.findOne({
      where: {
        [Op.and]: [
          { userId: req.body.userId },
          { id: req.body.mealPlanerInfo.id }
        ]
      },
    })

    console.log(candidate);

    if (candidate) {
      // Если запись в БД найдена, вносим изменения в существующий план рациона на сутки
      const update = {
        targetProtein: req.body.mealPlanerInfo.targetProtein,
        targetFats: req.body.mealPlanerInfo.targetFats,
        targetCarb: req.body.mealPlanerInfo.targetCarb,
        targetWeight: req.body.mealPlanerInfo.targetWeight,
        title: req.body.mealPlanerInfo.title,
        description: req.body.mealPlanerInfo.description,
        marks: JSON.stringify(req.body.mealPlanerInfo.marks),
        social: JSON.stringify(req.body.mealPlanerInfo.social),
        mealParts: JSON.stringify(req.body.mealPlanerInfo.mealParts)
      }

      const params = {
        where: {
          id: req.body.mealPlanerInfo.id
        }
      }

      const updatedMealPlan = await MealPlanerInfo.update(update, params)

      if (updatedMealPlan[0]) {
        const response = {
          updatedToken: req.body.updatedToken,
          data: {
            mealPlanerInfo: req.body.mealPlanerInfo
          }
        }
        res.status(200).json(response)
      } else {
        res.status(500).json({
          message: 'Неизвестная ошибка при обновлении.'
        })
      }
    } else {
      // Если запись в БД не найдена, создаем план рациона на сутки
      const currentDate = new Date().toJSON().split('T')[0]

      const savedMealPlan = await MealPlanerInfo.create({
        userId: req.body.userId,
        date: new Date(currentDate).getTime() / 1000, // текущая дата в милисекундах
        targetProtein: req.body.mealPlanerInfo.targetProtein,
        targetFats: req.body.mealPlanerInfo.targetFats,
        targetCarb: req.body.mealPlanerInfo.targetCarb,
        targetWeight: req.body.mealPlanerInfo.targetWeight,
        title: req.body.mealPlanerInfo.title,
        description: req.body.mealPlanerInfo.description,
        marks: JSON.stringify(req.body.mealPlanerInfo.marks),
        social: JSON.stringify(req.body.mealPlanerInfo.social),
        mealParts: JSON.stringify(req.body.mealPlanerInfo.mealParts)
      })

      const response = {
        updatedToken: req.body.updatedToken,
        data: {
          mealPlanerInfo: savedMealPlan
        }
      }
      res.status(200).json(response)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

module.exports.removeMealPlanerInfo = async function (req, res) {
  try {
    const candidate = await MealPlanerInfo.findOne({
      where: {
        [Op.and]: [
          { id: req.body.mealPlanerInfoID },
          { userId: req.body.userId }
        ]
      },
    })

    if (candidate) {
      const removedMealPlanerInfo = await MealPlanerInfo.destroy({
        where: {
          [Op.and]: [
            { id: req.body.mealPlanerInfoID },
            { userId: req.body.userId }
          ]
        }
      })

      const response = {
        updatedToken: req.body.updatedToken,
        data: {
          removed: removedMealPlanerInfo ? true : false
        }
      }

      res.status(200).json(response)
    } else {
      res.status(400).json({
        message: 'Данные не найдены. Удаление не возможно.'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
