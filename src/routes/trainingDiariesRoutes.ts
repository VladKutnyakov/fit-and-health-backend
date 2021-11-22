import express, { Router } from 'express'
import trainingDiariesContrallers from '../controllers/trainingDiariesContrallers'
import JwtGuard from '../middleware/Guards/JwtGuard'
const router: Router = express.Router()

// http://localhost:3031/api/training-diary
router.get('/', JwtGuard, trainingDiariesContrallers.getTrainingDiaryInfo)

export default router
