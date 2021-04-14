// const Sequelize = require('sequelize')
// const Op = Sequelize.Op;
// const errorHandler = require('../utils/errorHandler.js')
const TrainingPrograms = require('../models/TrainingPrograms')

module.exports.fetchMainTrainingProgram = async function (req, res) {

  TrainingPrograms.findOne(
    {
      where: {id: 1}
    })
  .then( (mainTrainingProgram) => {
    res.status(200).json(mainTrainingProgram)
  })
  .catch(err=>console.log(err))

}
