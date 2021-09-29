import express, { Router } from 'express'
import profileControllers from '../controllers/profileControllers'
import JwtGuard from '../middleware/Guards/JwtGuard'
const router: Router = express.Router()

/**
* @swagger
* /api/profile/{profileId}:
*   get:
*     tags:
*       - Профиль пользователя
*     summary: Получить данные о пользователе
*     parameters:
*       - in: path
*         name: profileId
*         type: number
*         format: number
*         required: true
*     security:
*	     - jwt: []
*     responses:
*       200:
*         description: Returns a mysterious string.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 id:
*                   type: integer
*                   description: Id пользователя
*                 userName:
*                   type: string
*                   description: Имя пользователя
*       401:
*         description: Ошибка авторизации
*/
router.get('/:profileId', JwtGuard, profileControllers.login)

export default router
