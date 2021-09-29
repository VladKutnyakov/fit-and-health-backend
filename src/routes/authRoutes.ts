import express, { Router } from 'express'
import authControllers from '../controllers/authControllers'
const router: Router = express.Router()

/**
* @swagger
* /api/auth/login:
*   post:
*     tags:
*       - Авторизация
*     summary: Авторизация пользователя
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             required: true
*             properties:
*               email:
*                 type: string
*                 description: Email пользователя
*               password:
*                 type: string
*                 description: Пароль пользователя
*     responses:
*       200:
*         description: Token авторизации
*         content:
*           text/plain:
*             schema:
*               type: string
*               example: token_string
*       401:
*         description: Ошибка авторизации
*       500:
*         description: Неизвестная ошибка. Обратитесь к разработчику.
*/
router.post('/login', authControllers.login)

router.post('/register', authControllers.register)

export default router
