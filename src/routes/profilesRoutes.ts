import express, { Router } from 'express'
import profilesControllers from '../controllers/profiles/index'
import JwtGuard from '../middleware/Guards/JwtGuard'
const router: Router = express.Router()

/**
* @swagger
* /api/profiles:
*   get:
*     tags:
*       - Пользователи
*     summary: Получить список пользователей
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
*                   description: Id информации профиля
*       401:
*         description: Ошибка авторизации
*/
router.get('/', JwtGuard, profilesControllers.getProfilesList)

/**
* @swagger
* /api/profiles/{profileId}:
*   get:
*     tags:
*       - Пользователи
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
*                   description: Id информации профиля
*                 firstName:
*                   type: string
*                   description: Имя
*                 middleName:
*                   type: string
*                   description: Отчество
*                 lastName:
*                   type: string
*                   description: Фамилия
*                 birthday:
*                   type: string
*                   description: День рождения
*                 phone:
*                   type: string
*                   description: Телефон
*                 gender:
*                   type: string
*                   description: Пол
*                 weight:
*                   type: string
*                   description: Вес
*                 height:
*                   type: string
*                   description: Рост
*                 city:
*                   type: string
*                   description: Город
*                 site:
*                   type: string
*                   description: Сайт
*                 vk:
*                   type: string
*                   description: Ссылка на профиль vk
*                 facebook:
*                   type: string
*                   description: Ссылка на профиль facebook
*                 instagram:
*                   type: string
*                   description: Ссылка на профиль instagram
*                 youtube:
*                   type: string
*                   description: Ссылка на профиль youtube
*                 twitter:
*                   type: string
*                   description: Ссылка на профиль twitter
*                 skype:
*                   type: string
*                   description: Ссылка на профиль skype
*       401:
*         description: Ошибка авторизации
*/
router.get('/:profileId', JwtGuard, profilesControllers.getProfileInfo)

export default router
