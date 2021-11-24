import express, { Router } from 'express'
import trainingProcessContrallers from '../controllers/trainingProcessContrallers'
import JwtGuard from '../middleware/Guards/JwtGuard'
const router: Router = express.Router()

// http://localhost:3031/api/training-process/training-program-info/:trainingProgramId
/**
* @swagger
* /api/training-process/training-program-info/{trainingProgramId}:
*   get:
*     tags:
*       - Тренировочный процесс
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
router.get('/:trainingProgramId', JwtGuard, trainingProcessContrallers.getTrainingProgramInfo)

// http://localhost:3031/api/training-process/training-day-info/:trainingProgramId
/**
* @swagger
* /api/training-process/training-day-info/{trainingProgramId}:
*   get:
*     tags:
*       - Тренировочный процесс
*     summary: Получить данные о тренировочном дне
*     security:
*       - jwt: []
*     parameters:
*     - in: path
*       name: trainingDayId
*       schema:
*         type: number
*       required: true
*       description: ID тренировочного дня
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
router.get('/:trainingDayId', JwtGuard, trainingProcessContrallers.getTrainingDayInfo)

export default router
