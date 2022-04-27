import express, { Router } from 'express'
import settingsControllers from '../controllers/settings/index'
import JwtGuard from '../middleware/Guards/JwtGuard'
const router: Router = express.Router()

// http://localhost:3031/api/settings/fetch-app-theme
/**
* @swagger
* /api/settings/fetch-app-theme:
*   get:
*     tags:
*       - Настройки
*     summary: Получить выбранную у пользователя тему для приложения
*     security:
*       - jwt: []
*     responses:
*       200:
*         description: Тема для приложения
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 browserTheme:
*                   type: string
*                   description: тема приложения для браузеров
*                 mobileAppTheme:
*                   type: string
*                   description: тема приложения для мобильного приложения
*       401:
*         description: Ошибка авторизации
*/
router.get('/fetch-app-theme', JwtGuard, settingsControllers.fetchAppTheme)

// http://localhost:3031/api/settings/set-app-theme
/**
* @swagger
* /api/settings/set-app-theme:
*   put:
*     tags:
*       - Настройки
*     summary: Изменить выбранную у пользователя тему для приложения
*     security:
*       - jwt: []
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             required: true
*             properties:
*               browserTheme:
*                 type: string
*                 description: тема приложения для браузеров
*               mobileAppTheme:
*                 type: string
*                 description: тема приложения для мобильного приложения
*     responses:
*       200:
*         description: Тема для приложения
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 browserTheme:
*                   type: string
*                   description: тема приложения для браузеров
*                 mobileAppTheme:
*                   type: string
*                   description: тема приложения для мобильного приложения
*       401:
*         description: Ошибка авторизации
*/
router.put('/set-app-theme', JwtGuard, settingsControllers.setAppTheme)

export default router
