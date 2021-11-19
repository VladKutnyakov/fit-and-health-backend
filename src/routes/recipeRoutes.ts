import express, { Router } from 'express'
import recipeControllers from '../controllers/recipeControllers'
import JwtGuard from '../middleware/Guards/JwtGuard'
const router: Router = express.Router()

// http://localhost:3031/api/recipe/:recipeId
/**
* @swagger
* /api/recipe/{recipeId}:
*   get:
*     tags:
*       - Рецепт
*     summary: Получить данные о рецепте
*     security:
*       - jwt: []
*     parameters:
*     - in: path
*       name: recipeId
*       schema:
*         type: number
*       required: true
*       description: ID рецепта
*     responses:
*       200:
*         description: Список продуктов
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 updatedToken:
*                   type: string
*                   description: Обновленный токен авторизации
*                 data:
*                   type: object
*                   properties:
*                     id:
*                       type: integer
*                       description: Id рецепта
*                     title:
*                       type: string
*                       description: Название рецепта
*                     description:
*                       type: string
*                       description: Описание рецепта
*                     cookingTimes:
*                       type: integer
*                       description: Время приготовления
*                     cookingSkill:
*                       type: integer
*                       description: Сложность приготовления
*                     recipeProducts:
*                       type: array
*                       items:
*                         type: object
*                         properties:
*                           weightInRecipe:
*                             type: integer
*                             description: Вес продукта в рецепте
*                           product:
*                             type: object
*                             properties:
*                               id:
*                                 type: integer
*                                 description: Id продутка
*                               title:
*                                 type: string
*                                 description: Название продутка
*                               weight:
*                                 type: integer
*                                 description: Вес продутка
*                               protein:
*                                 type: integer
*                                 description: Содержание белков
*                               fats:
*                                 type: integer
*                                 description: Содержание жиров
*                               carb:
*                                 type: integer
*                                 description: Содержание углеводов
*                               kkal:
*                                 type: integer
*                                 description: Калорийность
*                     recipeSteps:
*                       type: array
*                       items:
*                         type: object
*                         properties:
*                           id:
*                             type: integer
*                             description: id этапа приготовления
*                           description:
*                             type: string
*                             description: Описнаие этапа приготовления
*                     marks:
*                       type: array
*                       items:
*                         type: object
*                         properties:
*                           id:
*                             type: integer
*                             description: id отметки
*                           title:
*                             type: string
*                             description: Название отметки
*                     user:
*                       type: object
*                       properties:
*                         id:
*                           type: integer
*                           description: id пользователя
*       401:
*         description: Ошибка авторизации
*/
router.get('/:recipeId', JwtGuard, recipeControllers.getRecipeInfo)

export default router
