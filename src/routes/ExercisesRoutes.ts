import express, { Router } from 'express'
import exercisesControllers from '../controllers/ExercisesControllers'
import JwtGuard from '../middleware/Guards/JwtGuard'
const router: Router = express.Router()

// http://localhost:3000/api/exercises
router.get('/', JwtGuard, exercisesControllers.fetchExercisesList)
router.post('/fetch-exercise-info', JwtGuard, exercisesControllers.fetchExerciseInfo)
router.post('/save-new-exercise', JwtGuard, exercisesControllers.saveNewExercise)

export default router
