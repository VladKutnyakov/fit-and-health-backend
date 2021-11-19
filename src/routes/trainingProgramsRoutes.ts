import express, { Router } from 'express'
import trainingProgramsContrallers from '../controllers/trainingProgramsContrallers'
import JwtGuard from '../middleware/Guards/JwtGuard'
const router: Router = express.Router()

// http://localhost:3031/api/training-programs/
/**
* @swagger
* /api/training-programs:
*   get:
*     tags:
*       - Тренировочные программы
*     summary: Список тренировочных программ
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
router.get('/', JwtGuard, trainingProgramsContrallers.getTrainingPrograms)

export default router
