import express, { Router } from 'express'
import recipesBookControllers from '../controllers/recipesBookControllers'
import JwtGuard from '../middleware/Guards/JwtGuard'
const router: Router = express.Router()

// http://localhost:3000/api/recipe-book
/**
* @swagger
* /api/recipe-book:
*   get:
*     tags:
*       - Рецепты
*     summary: Список рецептов
*     security:
*       - jwt: []
*     responses:
*       200:
*         description: Список категорий продуктов
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 updatedToken:
*                   type: string
*                   description: Обновленный токен авторизации
*                 data:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       id:
*                         type: integer
*                         description: Id категории
*                       title:
*                         type: string
*                         description: Название категории
*       401:
*         description: Ошибка авторизации
*/
router.get('/', JwtGuard, recipesBookControllers.getRecipes)

export default router
