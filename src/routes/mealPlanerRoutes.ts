import express, { Router } from 'express'
import mealPlanerControllers from '../controllers/mealPlaner/index'
import JwtGuard from '../middleware/Guards/JwtGuard'
const router: Router = express.Router()

// http://localhost:3031/api/meal-planer
// http://localhost:3031/api/meal-planer?date=2021-12-31
/**
* @swagger
* /api/meal-planer:
*   get:
*     tags:
*       - Дневник питания
*     summary: План питания на сутки
*     security:
*       - jwt: []
*     parameters:
*     - in: query
*       name: date
*       schema:
*         type: string
*       description: Дата плана питания
*     responses:
*       200:
*         description: План питания на сутки
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 id:
*                   type: number
*                   description: Id рациона
*                 date:
*                   type: string
*                   description: Дата
*                 title:
*                   type: string
*                   description: Название
*                 description:
*                   type: string
*                   description: Описание
*                 targetProtein:
*                   type: number
*                   description: Кол-во белков (целевое)
*                 targetFats:
*                   type: number
*                   description: Кол-во жиров (целевое)
*                 targetCarb:
*                   type: number
*                   description: Кол-во углеводов (целевое)
*                 currentWeight:
*                   type: number
*                   description: Текущий вес пользователя
*                 targetWeight:
*                   type: number
*                   description: Текущий вес пользователя
*                 marks:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       id:
*                         type: number
*                         description: ID отметки
*                       title:
*                         type: string
*                         description: Название отметки
*                 mealParts:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       id:
*                         type: number
*                         description: ID приема пищи
*                       title:
*                         type: string
*                         description: Название приема пищи
*                       mealTime:
*                         type: string
*                         description: Время приема пищи
*                       mealPartProducts:
*                         type: array
*                         items:
*                           type: object
*                           properties:
*                             weightInMealPart:
*                               type: number
*                               description: Вес продукта для выбранного приема пищи
*                             product:
*                               type: object
*                               properties:
*                                 id:
*                                   type: number
*                                   description: ID продукта
*                                 title:
*                                   type: string
*                                   description: Название продукта
*                                 weight:
*                                   type: number
*                                   description: Вес продукта по умолчанию
*                                 protein:
*                                   type: number
*                                   description: Кол-во белков в продукте
*                                 fats:
*                                   type: number
*                                   description: Кол-во белков в продукте
*                                 carb:
*                                   type: number
*                                   description: Кол-во белков в продукте
*                                 kkal:
*                                   type: number
*                                   description: Кол-во белков в продукте
*                       mealPartRecipes:
*                         type: array
*                         items:
*                           type: object
*                           properties:
*                             id:
*                               type: number
*                               description: Id рецепта
*                 user:
*                   type: object
*                   properties:
*                     id:
*                       type: integer
*                       description: ID пользователя
*       401:
*         description: Ошибка авторизации
*/
router.get('/', JwtGuard, mealPlanerControllers.fetchMealPlanerInfo)

// http://localhost:3031/api/meal-planer/save-meal-planer-info
/**
* @swagger
* /api/meal-planer/save-meal-planer-info:
*   post:
*     tags:
*       - Дневник питания
*     summary: Сохранить или обновить план питания на сутки
*     security:
*       - jwt: []
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             required: true
*             properties:
*               mealPlanerInfo:
*                 type: object
*                 properties:
*                   id:
*                     type: integer
*                     description: Id плана питания
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
*                   type: object
*                   properties:
*                     id:
*                       type: integer
*                       description: Id категории
*       401:
*         description: Ошибка авторизации
*/
router.post('/save-meal-planer-info', JwtGuard, mealPlanerControllers.saveMealPlanerInfo)
// router.post('/remove-meal-planer-info', JwtGuard, mealPlanerControllers.removeMealPlanerInfo)

export default router
