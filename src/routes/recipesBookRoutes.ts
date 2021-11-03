import express, { Router } from 'express'
import recipesBookControllers from '../controllers/recipesBookControllers'
import JwtGuard from '../middleware/Guards/JwtGuard'
const router: Router = express.Router()

// http://localhost:3000/api/recipe-book
router.get('/', JwtGuard, recipesBookControllers.getRecipes)

export default router
