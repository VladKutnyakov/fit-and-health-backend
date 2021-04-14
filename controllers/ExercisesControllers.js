const Sequelize = require('sequelize')
// const Op = Sequelize.Op;
// const errorHandler = require('../utils/errorHandler.js')
const Exercises = require('../models/Exercises')

module.exports.fetchExercisesList = async function (req, res) {
  try {
    const ExercisesList = await Exercises.findAll()
    res.status(200).json(ExercisesList)
  } catch (err) {
    console.log(err)
  }
}

module.exports.fetchExerciseInfo = async function (req, res) {
  try {
    const ExerciseInfo = await Exercises.findOne({
      where: {id: req.body.id}
    })
    res.status(200).json(ExerciseInfo)
  } catch (err) {
    console.log(err)
  }
}

module.exports.saveNewExercise = async function (req, res) {
  try {
    const savedExercise = await Exercises.create({
      title: req.body.title,
      techniqueDescription: req.body.techniqueDescription,
      category: req.body.category
    })
    res.status(200).json(savedExercise)
  } catch (err) {
    console.log(err)
  }
}
