import express, { Router } from 'express'
import mealPlanerControllers from '../controllers/mealPlanerControllers'
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
*                 updatedToken:
*                   type: string
*                   description: Обновленный токен авторизации
*                 data:
*                   type: object
*                   properties:
*                     id:
*                       type: integer
*                       description: Id плана питания

*       401:
*         description: Ошибка авторизации
*/
router.get('/', JwtGuard, mealPlanerControllers.getMealPlanerInfo)

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
