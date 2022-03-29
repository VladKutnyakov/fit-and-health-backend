import express, { Router } from 'express'
import trainingProcessContrallers from '../controllers/trainingProcess/index'
import JwtGuard from '../middleware/Guards/JwtGuard'
const router: Router = express.Router()

// http://localhost:3031/api/training-process/training-program-info?trainingProgram=1&trainingDay=1
/**
* @swagger
* /api/training-process/training-program-info:
*   get:
*     tags:
*       - Тренировочный процесс
*     summary: Получить данные о тренировочной программе
*     security:
*       - jwt: []
*     parameters:
*     - in: query
*       name: trainingProgram
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
*                 trainingProgram:
*                   type: object
*                   properties:
*                     id:
*                       type: integer
*                       description: ID тренировочной программы
*                     title:
*                       type: integer
*                       description: Название тренировочной программы
*                 previewImage:
*                   type: string
*                   description: Ссылка на изображение
*                 trainingProgramAccent:
*                   type: object
*                   properties:
*                     power:
*                       type: integer
*                       description: Акцент тренировочной праграммы на развитие силы (процент)
*                     endurance:
*                       type: integer
*                       description: Акцент тренировочной праграммы на развитие выносливости (процент)
*                     flexibility:
*                       type: integer
*                       description: Акцент тренировочной праграммы на развитие гибкости (процент)
*                     cardio:
*                       type: integer
*                       description: Акцент тренировочной праграммы на развитие кардио (процент)
*                 trainingDay:
*                   type: object
*                   properties:
*                     id:
*                       type: integer
*                       description: ID дня тренировочной программы
*                     title:
*                       type: integer
*                       description: Название дня тренировочной программы
*                 trainingProgramDaysList:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       id:
*                         type: integer
*                         description: ID дня тренировочной программы
*                       title:
*                         type: integer
*                         description: Название дня тренировочной программы
*       401:
*         description: Ошибка авторизации
*/
router.get('/training-program-info', JwtGuard, trainingProcessContrallers.getTrainingProgramInfo)

// http://localhost:3031/api/training-process/training-day-info?trainingDay
/**
* @swagger
* /api/training-process/training-day-info:
*   get:
*     tags:
*       - Тренировочный процесс
*     summary: Получить данные о тренировочном дне
*     security:
*       - jwt: []
*     parameters:
*     - in: query
*       name: trainingDay
*       schema:
*         type: number
*       required: true
*       description: ID тренировочного дня
*     responses:
*       200:
*         description: Данные о дне тренировочной программы
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 trainingDay:
*                   type: object
*                   properties:
*                     id:
*                       type: integer
*                       description: ID дня тренировочной программы
*                     title:
*                       type: string
*                       description: Название дня тренировочной программы
*                 trainingType:
*                   type: object
*                   properties:
*                     id:
*                       type: integer
*                       description: ID типа дня тренировочной программы
*                     title:
*                       type: string
*                       description: Название типа дня тренировочной программы
*                 comment:
*                   type: string
*                   description: Комментарий к тренировочному дню
*                 trainingProgramDayExercises:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       id:
*                         type: integer
*                         description: ID упражнения
*                       title:
*                         type: string
*                         description: Название упражнения
*                       isStarted:
*                         type: boolean
*                         description: Признак активно выполнение упражнения или нет
*                       approaches:
*                         type: array
*                         items:
*                           type: object
*                           properties:
*                             isActive:
*                               type: boolean
*                               description: Признак активно выполнение подхода или нет
*                             title:
*                               type: string
*                               description: Название подхода
*                             repeats:
*                               type: integer
*                               description: Кол-во повторений в подходе
*                             additionalWeight:
*                               type: integer
*                               description: Дополнительный вес при выполнении подхода
*                             implementationTime:
*                               type: integer
*                               description: Время выполнения
*                             restTime:
*                               type: integer
*                               description: Время восстановления
*       401:
*         description: Ошибка авторизации
*/
router.get('/training-day-info', JwtGuard, trainingProcessContrallers.getTrainingDayInfo)

export default router
