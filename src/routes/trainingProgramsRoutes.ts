import express, { Router } from 'express'
import trainingProgramsContrallers from '../controllers/trainingPrograms/index'
import JwtGuard from '../middleware/Guards/JwtGuard'
const router: Router = express.Router()

// http://localhost:3031/api/training-programs/page-info
/**
* @swagger
* /api/training-programs/page-info:
*   get:
*     tags:
*       - Тренировочные программы
*     summary: Общая информация о разделе
*     security:
*       - jwt: []
*     responses:
*       200:
*         description: Общая информация о разделе
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 programs:
*                   type: number
*                   description: Общее кол-во тренировочных программ
*                 userPrograms:
*                   type: number
*                   description: Общее кол-во тренировочных программ пользователя
*                 pinnedPrograms:
*                   type: number
*                   description: Общее кол-во закрепленных тренировочных программ пользователя
*                 favoritePrograms:
*                   type: number
*                   description: Общее кол-во избранных тренировочных программ пользователя
*       401:
*         description: Ошибка авторизации
*/
router.get('/page-info', JwtGuard, trainingProgramsContrallers.fetchTrainingProgramsPageInfo)

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
*               type: array
*               items:
*                 type: object
*                 properties:
*                   id:
*                     type: integer
*                     description: Id категории
*                   title:
*                     type: string
*                     description: Название категории
*       401:
*         description: Ошибка авторизации
*/
router.get('/', JwtGuard, trainingProgramsContrallers.fetchTrainingProgramsList)

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
*                     title:
*                       type: string
*                       description: Название тренировочной программы
*                     description:
*                       type: string
*                       description: Описание тренировочной программы
*                     skill:
*                       type: object
*                       properties:
*                         id:
*                           type: string
*                           description: ID уровня навыка (мастерства)
*                         excellenceTitle:
*                           type: string
*                           description: Название уровня навыка (мастерства)
*                         complexityTitle:
*                           type: string
*                           description: Название уровня навыка (сложности)
*                         value:
*                           type: string
*                           description: Числовое обозначение уровня навыка (мастерства)
*                     marks:
*                       type: array
*                       items:
*                         type: object
*                         properties:
*                           id:
*                             type: integer
*                             description: ID отметки
*                           title:
*                             type: string
*                             description: Название отметки
*                     trainingProgramDayExercises:
*                       type: array
*                       items:
*                         type: object
*                         properties:
*                           approaches:
*                             type: integer
*                             description: Кол-во подходов
*                           repeats:
*                             type: string
*                             description: Кол-во повторений
*                           additionalWeight:
*                             type: string
*                             description: Дополнительный вес при выполнении упражнения
*                           implementationTime:
*                             type: string
*                             description: Время выполнения упражнения
*                           restTime:
*                             type: string
*                             description: Время восстановления (пауза) между подходами
*                           exercise:
*                             type: object
*                             properties:
*                               id:
*                                 type: integer
*                                 description: ID упражнения
*                               title:
*                                 type: integer
*                                 description: ID упражнения
*                     user:
*                       type: object
*                       properties:
*                         id:
*                           type: string
*                           description: ID пользователя
*       401:
*         description: Ошибка авторизации
*/
router.get('/:trainingProgramId', JwtGuard, trainingProgramsContrallers.getTrainingProgramInfo)

// http://localhost:3031/api/training-programs/save-training-program
router.post('/save-training-program', JwtGuard, trainingProgramsContrallers.saveTrainingProgram)

// http://localhost:3031/api/training-programs/update-training-program
router.put('/update-training-program', JwtGuard, trainingProgramsContrallers.updateTrainingProgram)

export default router
