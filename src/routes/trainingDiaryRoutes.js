const express = require('express')
const trainingDiaryControllers = require('../controllers/trainingDiaryControllers')
const router = express.Router()

// passport не дает выполнять корректно fetch запросы axios. 
// перепроверить как работает паспорт и вообще авторизация и перенастроить . поправить все

// http://localhost:3000/api/recipe/:id
router.get('/', trainingDiaryControllers.fetchMainTrainingProgram)

module.exports = router
