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
*         description: Список тренировочных программ
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

// http://localhost:3031/api/training-programs/:trainingProgramId
/**
* @swagger
* /api/training-programs/{trainingProgramId}:
*   get:
*     tags:
*       - Тренировочные программы
*     summary: Получить данные о тренировочной программе
*     security:
*       - jwt: []
*     parameters:
*     - in: path
*       name: trainingProgramId
*       schema:
*         type: number
*       required: true
*       description: ID тренировочной программе
*     responses:
*       200:
*         description: Данные о тренировочной программе
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
*                       description: Id тренировочной программы
*       401:
*         description: Ошибка авторизации
*/
router.get('/:trainingProgramId', JwtGuard, trainingProgramsContrallers.getTrainingProgramInfo)

export default router
