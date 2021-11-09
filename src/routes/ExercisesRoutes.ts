import express, { Router } from 'express'
import exercisesControllers from '../controllers/exercisesControllers'
import JwtGuard from '../middleware/Guards/JwtGuard'
const router: Router = express.Router()

// http://localhost:3031/api/exercises
/**
* @swagger
* /api/exercises:
*   get:
*     tags:
*       - Справочник упражнений
*     summary: Список упражнений по мышечным группам
*     security:
*       - jwt: []
*     responses:
*       200:
*         description: Список упражнений по мышечным группам
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
*                         description: ID мышечной группы
*                       title:
*                         type: string
*                         description: Название мышечной группы
*                       exercises:
*                         type: array
*                         items:
*                           type: object
*                           properties:
*                             id:
*                               type: integer
*                               description: ID упражнения
*                             title:
*                               type: string
*                               description: Название упражнения
*                             user:
*                               type: object
*                               properties:
*                                 id:
*                                   type: integer
*                                   description: ID пользователя
*       401:
*         description: Ошибка авторизации
*/
router.get('/', JwtGuard, exercisesControllers.fetchExercisesList)
router.post('/fetch-exercise-info', JwtGuard, exercisesControllers.fetchExerciseInfo)
router.post('/save-new-exercise', JwtGuard, exercisesControllers.saveNewExercise)

export default router
