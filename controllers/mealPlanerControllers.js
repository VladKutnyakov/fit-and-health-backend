const Sequelize = require('sequelize')
const sequelize = require('../utils/dbConnect')
const Op = Sequelize.Op
const MealPlaner = require('../models/MealPlaner')
const Marks = require('../models/Marks')
const Socials = require('../models/Socials')
const MealParts = require('../models/MealParts')
const Products = require('../models/Products')
const MealPartProducts = require('../models/MealPartProducts')

// Формат даты для всего проекта --- 2021-12-29
// Показать дату в мс
// console.log(new Date('2021-12-29').getTime() / 1000)

module.exports.getMealPlanerInfo = async function (req, res) {
  async function getInfo (t, date) {
    // console.log(date)

    const mealPlan = await MealPlaner.findOne({
      where: {
        [Op.and]: [
          { userId: req.body.userId },
          { date: date } // переданная дата (строка) приведенная в милесекунды
        ]
      },
      include: [
        {
          model: Marks,
          as: 'marks'
        },
        {
          model: Socials,
          as: 'socials',
          attributes: {
            exclude: ['id', 'mealPlanerId']
          }
        },
        {
          model: MealParts,
          as: 'mealParts',
          attributes: {
            exclude: ['id', 'mealPlanerId']
          },
          include: [
            {
              model: MealPartProducts,
              as: 'products',
              attributes: {
                exclude: ['id', 'mealPartId', 'productId']
              },
              include: [
                {
                  model: Products,
                  as: 'product',
                  attributes: {
                    exclude: ['createdAt', 'updatedAt']
                  }
                },
              ]
            },
          ]
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      raw: false,
    }, { transaction: t })

    if (mealPlan) {
      // console.log(mealPlan.toJSON())

      const mealPlanInfo = mealPlan.toJSON()

      const CurrentMealPlan = {
        id: mealPlanInfo.id,
        userId: mealPlanInfo.userId,
        date: new Date(mealPlanInfo.date * 1000).toJSON().split('T')[0],
        title: mealPlanInfo.title || '',
        description: mealPlanInfo.description || '',
        targetProtein: mealPlanInfo.targetProtein || 2,
        targetFats: mealPlanInfo.targetFats || 1,
        targetCarb: mealPlanInfo.targetCarb || 3,
        targetWeight: mealPlanInfo.targetWeight || 0,
        currentWeight: mealPlanInfo.currentWeight || 0,
        // marks: mealPlanInfo.marks ? JSON.parse(mealPlanInfo.marks.tags) : [],
        marks: [],
        likes: mealPlanInfo.socials ? mealPlanInfo.socials.likes : 0,
        dislikes: mealPlanInfo.socials ? mealPlanInfo.socials.dislikes : 0,
        share: mealPlanInfo.socials ? mealPlanInfo.socials.share : 0,
        mealParts: mealPlanInfo.mealParts.length > 0 ? mealPlanInfo.mealParts : [{title: 'Завтрак', mealTime: '08:00', products: [], recipes: []}]
      }

      for (let i = 0; i < CurrentMealPlan.mealParts.length; i++) {
        const preparedProducts = []
        CurrentMealPlan.mealParts[i].products.forEach((element) => {
          const item = {...element.product}
          item.weight = element.currentWeight
          preparedProducts.push(item)
        })
        CurrentMealPlan.mealParts[i].products = preparedProducts
      }

      // console.log(CurrentMealPlan)

      return CurrentMealPlan
    } else {
      // Если рацион на сутки не найден, поиск последней записи для формирование пустого рациона на сутки. Будут использованы данные из пердыдущего сохраненного дня или базовые значения для БЖУ, показателей веса и первого приема пищи.
      const lastMealPlan = await MealPlaner.findOne({
          where: {
            userId: req.body.userId
          },
          order: [ [ 'id', 'DESC' ]],
          raw: true,
      }, { transaction: t })

      const CurrentMealPlan = {
        id: null,
        userId: req.body.userId,
        date: new Date().toJSON().split('T')[0],
        title: '',
        description: '',
        targetProtein: lastMealPlan ? lastMealPlan.targetProtein : 2,
        targetFats: lastMealPlan ? lastMealPlan.targetFats : 1,
        targetCarb: lastMealPlan ? lastMealPlan.targetCarb : 3,
        targetWeight: lastMealPlan ? lastMealPlan.targetWeight : 0,
        currentWeight: lastMealPlan ? lastMealPlan.currentWeight : 0,
        marks: [],
        likes: 0,
        dislikes: 0,
        share: 0,
        mealParts: [
          {
            title: 'Завтрак',
            mealTime: '08:00',
            products: [],
            recipes: []
          }
        ]
      }

      return CurrentMealPlan
    }
  }

  try {
    const mealPlanDayInfo = await sequelize.transaction( async (t) => {
      if (req.query && req.query.date) {
        // Поиск плана питания на день в соответствие с указанной датой
        const targetDate = new Date(req.query.date).getTime() / 1000
        return getInfo (t, targetDate)
      } else {
        // Поиск текущей даты, если дата не указана
        const currentDate = new Date().toJSON().split('T')[0]
        const targetDate = new Date(currentDate).getTime() / 1000
        return getInfo (t, targetDate)
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
  // console.log(req.body)
  try {
    const candidate = await MealPlaner.findOne({
      where: {
        id: req.body.mealPlanerInfo.id
      },
      include: [
        {
          model: Marks,
          as: 'marks'
        },
        {
          model: MealParts,
          as: 'mealParts',
          include: [
            {
              model: MealPartProducts,
              as: 'products',
              include: [
                {
                  model: Products,
                  as: 'product'
                },
              ]
            },
          ]
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      raw: false,
    })

    if (candidate) {
      console.log('Обновить данные у рациона')

      // console.log(candidate.toJSON())

      // Если запись в БД найдена, вносим изменения в существующий план рациона на сутки
      const MealPlanerInfo = await sequelize.transaction( async (t) => {
        // Обновление данных о рационе питания
        const UpdatedMealPlan = await MealPlaner.update(
          {
            title: req.body.mealPlanerInfo.title,
            description: req.body.mealPlanerInfo.description,
            targetProtein: req.body.mealPlanerInfo.targetProtein,
            targetFats: req.body.mealPlanerInfo.targetFats,
            targetCarb: req.body.mealPlanerInfo.targetCarb,
            targetWeight: req.body.mealPlanerInfo.targetWeight,
            currentWeight: req.body.mealPlanerInfo.currentWeight
          },
          { where: { id: candidate.id } },
          { transaction: t }
        )

        // console.log(UpdatedMealPlan)

        if (candidate.toJSON().marks) {
          // Обновление данных об отметках, если они были созданы
          console.log('update marks')
          // const UpdatedMarks = await Marks.update(
          //   { marks: JSON.stringify(req.body.mealPlanerInfo.marks) },
          //   { where: { id: candidate.marksId } },
          //   { transaction: t }
          // )
        } else if (req.body.mealPlanerInfo.marks && req.body.mealPlanerInfo.marks.length > 0) {
          // Создание новой записи об отметках
          console.log('create new marks')
        }

        // // Обновление данных о социальных кнопках
        // const updatedSocials = await Socials.update(
        //   {
        //     likes: req.body.mealPlanerInfo.likes,
        //     dislikes: req.body.mealPlanerInfo.dislikes,
        //     share: req.body.mealPlanerInfo.share,
        //   },
        //   { where: { id: candidate.socialsId } },
        //   { transaction: t }
        // )

        // const payload = {
        //   ...updatedMealPlanerInfo.toJSON(),
        // }

        return UpdatedMealPlan
      })

      const response = {
        updatedToken: req.body.updatedToken,
        // data: {
        //   mealPlanerInfo: mealPlanerInfo
        // }
      }

      console.log(response);

      res.status(200).json(response)
    } else {
      // Если запись в БД НЕ НАЙДЕНА, создаем новую запись в БД
      console.log('создать новую запись в БД')

      const mealPlanerInfo = await sequelize.transaction( async (t) => {
        // Сохранение данных о рационе питания
        const currentDateStr = new Date().toJSON().split('T')[0]
        const date = new Date(currentDateStr).getTime() / 1000

        const savedMealPlan = await MealPlaner.create({
          date: date,
          title: req.body.mealPlanerInfo.title,
          description: req.body.mealPlanerInfo.description,
          targetProtein: req.body.mealPlanerInfo.targetProtein,
          targetFats: req.body.mealPlanerInfo.targetFats,
          targetCarb: req.body.mealPlanerInfo.targetCarb,
          targetWeight: req.body.mealPlanerInfo.targetWeight,
          currentWeight: req.body.mealPlanerInfo.currentWeight,
          userId: req.body.userId,
        }, { transaction: t })

        console.log(savedMealPlan.toJSON())

        // Сохранение данных об отметках
      //   const savedMarks = await Marks.create({
      //     // entityId: savedMealPlanerInfo.toJSON().id,
      //     marks: JSON.stringify(req.body.mealPlanerInfo.marks)
      //   }, { transaction: t })

      //   // Сохранение данных о социальных кнопках
      //   const savedSocials = await Socials.create({
      //     // entityId: savedMealPlanerInfo.toJSON().id,
      //     likes: req.body.mealPlanerInfo.likes,
      //     dislikes: req.body.mealPlanerInfo.dislikes,
      //     share: req.body.mealPlanerInfo.share,
      //   }, { transaction: t })

        // const payload = {
        //   ...mealPlanerInfo.toJSON(),
        // }

        return savedMealPlan
      })

      const response = {
        updatedToken: req.body.updatedToken,
        // data: {
        //   mealPlanerInfo: mealPlanerInfo
        // }
      }

      // console.log(response);

      res.status(200).json(response)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

module.exports.removeMealPlanerInfo = async function (req, res) {
  try {
    const candidate = await MealPlaner.findOne({
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
