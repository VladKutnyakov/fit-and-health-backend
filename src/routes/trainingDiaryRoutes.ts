import express, { Router } from 'express'
import trainingDiaryControllers from '../controllers/trainingDiaryControllers'
import JwtGuard from '../middleware/Guards/JwtGuard'
const router: Router = express.Router()

// http://localhost:3000/api/recipe/:id
router.get('/', JwtGuard, trainingDiaryControllers.fetchMainTrainingProgram)

export default router
