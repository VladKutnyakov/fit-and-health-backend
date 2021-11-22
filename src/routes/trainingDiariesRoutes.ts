import express, { Router } from 'express'
import trainingDiariesContrallers from '../controllers/trainingDiariesContrallers'
import JwtGuard from '../middleware/Guards/JwtGuard'
const router: Router = express.Router()

// http://localhost:3031/api/training-diary
// http://localhost:3031/api/training-diary?date=2021-12-31
/**
* @swagger
* /api/training-diary:
*   get:
*     tags:
*       - Дневник тренировок
*     summary: Информация о тренировке за выбранную дату
*     security:
*       - jwt: []
*     parameters:
*     - in: query
*       name: date
*       schema:
*         type: string
*       description: Дата тренировки
*     responses:
*       200:
*         description: Информация о тренировке за выбранную дату
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
*                       description: ID записи в тренировочном дневнике

*       401:
*         description: Ошибка авторизации
*/
router.get('/', JwtGuard, trainingDiariesContrallers.getTrainingDiaryInfo)

export default router
