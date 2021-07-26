const { Op } = require("sequelize")
const Marks = require('../models/Marks')
const AddedMarks = require('../models/AddedMarks')

const updateMarks = async function (entityId, updatedMarks, t) {

  // console.log('update marks')
  // console.log(entityId, updatedMarks)

  // Получить текущие отметки
  const EntityCurrentMarks = await AddedMarks.findAll({
    where: {
      [Op.or]: [
        { mealPlanerId: entityId }
      ]
    },
    raw: true
  }, { transaction: t })

  // Сохраненные отметки
  const currentMarksId = []
  EntityCurrentMarks.forEach((element) => {
    currentMarksId.push(element.markId)
  })

  // Новые отметки
  const NewMarks = updatedMarks.filter(item => !item.id)

  // Добавлние отметок в БД
  if (NewMarks.length > 0) {
    // Поиск отметки с таким же текстом в таблице Marks, если ее нет создать в таблице, а затем создать связь с entityId
    for (let i = 0; i < NewMarks.length; i++) {
      const Mark = await Marks.findOne({
        where: {
          tag: NewMarks[i].tag
        },
        raw: true
      }, { transaction: t })

      // console.log(Mark)

      if (Mark) {
        await AddedMarks.create({ markId: Mark.id, mealPlanerId: entityId })
      } else {
        console.log('create mark and addedMarks')
      }
    }
  }

  // Удаленные отметки
  const RemovedMarksId = []
  for (let i = 0; i < currentMarksId.length; i++) {
    let foundMark = false

    updatedMarks.forEach((element) => {
      if (currentMarksId[i] === element.id ) {
        foundMark = true
      }
    })

    if (!foundMark) {
      RemovedMarksId.push(currentMarksId[i])
    }
  }

  // Удаление отметок из БД
  await AddedMarks.destroy({
    where: {
      [Op.and]: [
        { markId: RemovedMarksId },
        { mealPlanerId: entityId }
      ]
    }
  }, { transaction: t })

}

module.exports = updateMarks
