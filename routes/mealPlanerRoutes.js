const express = require('express')
const JwtGuard = require('../utils/Guards/JwtGuard')
const controller = require('../controllers/mealPlanerControllers')
const router = express.Router()

// http://localhost:3031/api/meal-planer
// http://localhost:3031/api/meal-planer?date=07-02-2020
router.get('/', JwtGuard, controller.getMealPlanerInfo)
router.post('/save-meal-planer-info', JwtGuard, controller.saveMealPlanerInfo)

module.exports = router
