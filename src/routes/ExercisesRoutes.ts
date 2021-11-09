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

// http://localhost:3031/api/exercises/exercise-info/:exerciseId
/**
* @swagger
* /api/exercises/exercise-info/{exerciseId}:
*   get:
*     tags:
*       - Справочник упражнений
*     summary: Информация об упражнении
*     security:
*       - jwt: []
*     parameters:
*       - in: path
*         name: exerciseId
*         required: true
*         schema:
*           type: integer
*         description: ID упражнения
*     responses:
*       200:
*         description: Информация об упражнении
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
*                       description: ID упражнения
*                     title:
*                       type: string
*                       description: Название упражнения
*                     type:
*                       type: string
*                       description: Тип упражнения
*                     sort:
*                       type: string
*                       description: Вид упражнения
*                     equipment:
*                       type: string
*                       description: Необходимое оборудование для упражнения
*                     exertion:
*                       type: string
*                       description: Прилагаемое усилие
*                     practiceLevel:
*                       type: string
*                       description: Уровень подготовки (необходимый для выполнения)
*                     techniqueDescription:
*                       type: string
*                       description: Описание упражнения
*                     muscleGroup:
*                       type: object
*                       properties:
*                         id:
*                           type: number
*                           description: ID мышечной группы
*                         title:
*                           type: string
*                           description: Название мышечной группы
*                     user:
*                       type: object
*                       properties:
*                         id:
*                           type: number
*                           description: ID пользователя
*       401:
*         description: Ошибка авторизации
*/
router.get('/exercise-info/:exerciseId', JwtGuard, exercisesControllers.fetchExerciseInfo)

export default router
