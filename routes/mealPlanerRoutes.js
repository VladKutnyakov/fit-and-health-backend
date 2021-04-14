const express = require('express')
// const passport = require('passport')
const controller = require('../controllers/mealPlanerControllers')
const router = express.Router()

// passport не дает выполнять корректно fetch запросы axios. 
// перепроверить как работает паспорт и вообще авторизация и перенастроить . поправить все

// http://localhost:3000/api/meal-planer
// http://localhost:3000/api/meal-planer?date=07-02-2020
router.get('/', controller.getMealPlanerInfo)

module.exports = router
