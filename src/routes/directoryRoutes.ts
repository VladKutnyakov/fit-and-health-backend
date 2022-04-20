import express, { Router } from 'express'
import directoryControllers from '../controllers/directory/index'
import JwtGuard from '../middleware/Guards/JwtGuard'
const router: Router = express.Router()

// http://localhost:3031/api/directory/skill-types/
/**
* @swagger
* /api/directory/skill-types:
*   get:
*     tags:
*       - Общие справочники
*     summary: Список вариантов сложности (мастерства)
*     security:
*       - jwt: []
*     responses:
*       200:
*         description: Список вариантов сложности (мастерства)
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   id:
*                     type: integer
*                     description: ID мышечной группы
*                   excellenceTitle:
*                     type: string
*                     description: Название уровня навыка (мастерства)
*                   complexityTitle:
*                     type: string
*                     description: Название уровня навыка (сложности)
*                   value:
*                     type: string
*                     description: Числовое обозначение уровня сложности
*       401:
*         description: Ошибка авторизации
*/
router.get('/skill-types', JwtGuard, directoryControllers.fetchSkillTypes)

// http://localhost:3031/api/directory/training-types
/**
* @swagger
* /api/directory/training-types:
*   get:
*     tags:
*       - Общие справочники
*     summary: Список типов тренировок
*     security:
*       - jwt: []
*     responses:
*       200:
*         description: Список типов тренировок
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   id:
*                     type: integer
*                     description: ID типа тренировки
*                   title:
*                     type: string
*                     description: Название типа тренировки
*       401:
*         description: Ошибка авторизации
*/
router.get('/training-types', JwtGuard, directoryControllers.fetchTrainingTypes)

// http://localhost:3031/api/directory/training-places
/**
* @swagger
* /api/directory/training-places:
*   get:
*     tags:
*       - Общие справочники
*     summary: Список мест для тренировок
*     security:
*       - jwt: []
*     responses:
*       200:
*         description: Список мест для тренировок
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   id:
*                     type: integer
*                     description: ID места для тренировок
*                   title:
*                     type: string
*                     description: Название места для тренировок
*       401:
*         description: Ошибка авторизации
*/
router.get('/training-places', JwtGuard, directoryControllers.fetchTrainingPlaces)

export default router
