const Sequelize = require('sequelize')
const sequelize = require('../utils/dbConnect')

const Exercises = sequelize.define('exercises', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  techniqueDescription: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // targetMuscleGroup: {
  //   type: Sequelize.STRING,
  //   allowNull: true
  // },
  // exerciseType: {
  //   type: Sequelize.STRING,
  //   allowNull: true
  // },
  // additionalMuscle: {
  //   type: Sequelize.STRING,
  //   allowNull: true
  // },
  // exerciseVariety: {
  //   type: Sequelize.STRING,
  //   allowNull: true
  // },
  // equipment: {
  //   type: Sequelize.STRING,
  //   allowNull: true
  // },
  // trainingSkill: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false
  // }
})

module.exports = Exercises
