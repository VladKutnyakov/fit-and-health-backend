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
        { entityId: entityId }
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

  // console.log(NewMarks)

  // Добавлние отметок в БД
  if (NewMarks.length > 0) {
    for (let i = 0; i < NewMarks.length; i++) {
      // Поиск отметки с таким же текстом в таблице Marks
      const Mark = await Marks.findOne({
        where: {
          tag: NewMarks[i].tag
        },
        raw: true
      }, { transaction: t })

      if (Mark) {
        // Если отметка есть - создать связь с entityId
        await AddedMarks.create({ markId: Mark.id, entityId: entityId })
      } else {
        // Если отметки нет - создать в таблице, а затем создать связь с entityId
        const NewMark = await Marks.create({
          tag: NewMarks[i].tag,
          entityType: NewMarks[i].entityType
        }, { transaction: t })

        await AddedMarks.create({ markId: NewMark.id, entityId: entityId })
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
        { entityId: entityId }
      ]
    }
  }, { transaction: t })

}

module.exports = updateMarks
