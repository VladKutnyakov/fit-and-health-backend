const { DataTypes } = require('sequelize')
const sequelize = require('../utils/dbConnect')

const Exercises = sequelize.define('exercises', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  techniqueDescription: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // targetMuscleGroup: {
  //   type: DataTypes.STRING,
  //   allowNull: true
  // },
  // exerciseType: {
  //   type: DataTypes.STRING,
  //   allowNull: true
  // },
  // additionalMuscle: {
  //   type: DataTypes.STRING,
  //   allowNull: true
  // },
  // exerciseVariety: {
  //   type: DataTypes.STRING,
  //   allowNull: true
  // },
  // equipment: {
  //   type: DataTypes.STRING,
  //   allowNull: true
  // },
  // trainingSkill: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false
  // }
}, {
  freezeTableName: true,
  timestamps: false
})

module.exports = Exercises
