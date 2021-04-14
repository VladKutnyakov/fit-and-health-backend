const express = require('express')
// const passport = require('passport')
const controller = require('../controllers/foodCalorieTableControllers')
const router = express.Router()

// http://localhost:3000/api/food-calorie-table
router.get('/', controller.getAllProducts)
router.post('/save-product', controller.saveNewProduct)
router.post('/remove-product', controller.removeProduct)
router.post('/change-favorite-param', controller.changeFavoriteParam)

module.exports = router
