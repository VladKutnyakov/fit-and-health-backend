import express, { Router } from 'express'
import authControllers from '../controllers/auth'
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
*         content:
*           application/json:
*             schema:
*               type: object
*               required: true
*               properties:
*                 message:
*                   type: string
*                   description: Текст ошибки
*               example: Пользователь не найден.
*       500:
*         description: Неизвестная ошибка.
*/
router.post('/login', authControllers.login)

/**
* @swagger
* /api/auth/register:
*   post:
*     tags:
*       - Авторизация
*     summary: Регистрация пользователя
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
*       409:
*         description: Конфликт введенных данных
*         content:
*           application/json:
*             schema:
*               type: object
*               required: true
*               properties:
*                 message:
*                   type: string
*                   description: Текст ошибки
*               example: Введенный E-mail уже используется
*       500:
*         description: Неизвестная ошибка.
*/
router.post('/register', authControllers.register)

export default router
