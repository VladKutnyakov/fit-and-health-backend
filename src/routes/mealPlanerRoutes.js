const express = require('express')
const JwtGuard = require('../middleware/Guards/JwtGuard')
const mealPlanerControllers = require('../controllers/mealPlanerControllers')
const router = express.Router()

// http://localhost:3031/api/meal-planer
// http://localhost:3031/api/meal-planer?date=07-02-2020
router.get('/', JwtGuard, mealPlanerControllers.getMealPlanerInfo)
router.post('/save-meal-planer-info', JwtGuard, mealPlanerControllers.saveMealPlanerInfo)
router.post('/remove-meal-planer-info', JwtGuard, mealPlanerControllers.removeMealPlanerInfo)

module.exports = router