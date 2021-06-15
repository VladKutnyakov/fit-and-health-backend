const express = require('express')
const exercisesControllers = require('../controllers/ExercisesControllers')
const router = express.Router()

// passport не дает выполнять корректно fetch запросы axios. 
// перепроверить как работает паспорт и вообще авторизация и перенастроить . поправить все

// http://localhost:3000/api/exercises
router.get('/', exercisesControllers.fetchExercisesList)
router.post('/fetch-exercise-info', exercisesControllers.fetchExerciseInfo)
router.post('/save-new-exercise', exercisesControllers.saveNewExercise)

module.exports = router
