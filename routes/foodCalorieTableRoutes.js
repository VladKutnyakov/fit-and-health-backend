const express = require('express')
const JwtGuard = require('../middleware/Guards/JwtGuard')
const foodCalorieTableControllers = require('../controllers/foodCalorieTableControllers')
const router = express.Router()

// http://localhost:3031/api/food-calorie-table/
router.get('/', JwtGuard, foodCalorieTableControllers.getAllProducts)
router.post('/save-product', JwtGuard, foodCalorieTableControllers.saveNewProduct)
router.put('/update-product', JwtGuard, foodCalorieTableControllers.updateProduct)
router.delete('/remove-product/:id', JwtGuard, foodCalorieTableControllers.removeProduct)
router.post('/change-favorite-param', JwtGuard, foodCalorieTableControllers.changeFavoriteParam)
router.post('/change-pinned-param', JwtGuard, foodCalorieTableControllers.changePinnedParam)

module.exports = router
