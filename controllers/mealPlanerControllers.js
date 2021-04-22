const Sequelize = require('sequelize')
const sequelize = require('../utils/dbConnect')
const Op = Sequelize.Op;
const MealPlaner = require('../models/MealPlaner')

module.exports.getMealPlanerInfo = async function (req, res) {
  try {
    console.log(req.query.date)

    const MealPlanerInfo = await sequelize.transaction( async (t) => {

      if (req.body.date) {
        console.log(req.body.date)
        // const favoriteProduct = await FavoriteProducts.findOne({
        //   where: {
        //     [Op.and]: [
        //       { userId: req.body.userId },
        //       { productId: req.body.productId }
        //     ]
        //   },
        // }, { transaction: t })
      }

    })

    const response = {
      updatedToken: req.body.updatedToken,
      data: {
        mealPlanerInfo: MealPlanerInfo
      }
    }
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

