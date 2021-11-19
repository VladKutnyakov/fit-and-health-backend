import express, { Router } from 'express'
import trainingProgramsContrallers from '../controllers/trainingProgramsContrallers'
import JwtGuard from '../middleware/Guards/JwtGuard'
const router: Router = express.Router()

// http://localhost:3031/api/training-programs/
router.get('/', JwtGuard, trainingProgramsContrallers.getTrainingPrograms)

export default router
