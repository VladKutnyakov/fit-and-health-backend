import express, { Router } from 'express'
import mealPlanerControllers from '../controllers/mealPlanerControllers'
import JwtGuard from '../middleware/Guards/JwtGuard'
const router: Router = express.Router()

// http://localhost:3031/api/meal-planer
// http://localhost:3031/api/meal-planer?date=07-02-2020
router.get('/', JwtGuard, mealPlanerControllers.getMealPlanerInfo)
// router.post('/save-meal-planer-info', JwtGuard, mealPlanerControllers.saveMealPlanerInfo)
// router.post('/remove-meal-planer-info', JwtGuard, mealPlanerControllers.removeMealPlanerInfo)

export default router
