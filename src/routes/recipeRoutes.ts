import express, { Router } from 'express'
import recipeControllers from '../controllers/recipeControllers'
import JwtGuard from '../middleware/Guards/JwtGuard'
const router: Router = express.Router()

// http://localhost:3000/api/recipe/:id
router.get('/:id', JwtGuard, recipeControllers.getRecipe)

export default router
