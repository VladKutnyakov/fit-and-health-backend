import express, { Router } from 'express'
import foodCalorieTableControllers from '../controllers/foodCalorieTableControllers'
import JwtGuard from '../middleware/Guards/JwtGuard'
const router: Router = express.Router()

// http://localhost:3031/api/food-calorie-table/
/**
* @swagger
* /api/food-calorie-table/:
*   get:
*     tags:
*       - Таблица калорийности продуктов
*     summary: Список продуктов
*     security:
*	     - jwt: []
*     responses:
*       200:
*         description: Список продуктов
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
*                         description: Id продукта
*                       title:
*                         type: string
*                         description: Название продукта
*                       weight:
*                         type: integer
*                         description: Вес продукта (по умолчанию 100 гр.)
*                       protein:
*                         type: integer
*                         description: Кол-во белков (на 100 гр.)
*                       fats:
*                         type: integer
*                         description: Кол-во жиров (на 100 гр.)
*                       carb:
*                         type: integer
*                         description: Кол-во углеводов (на 100 гр.)
*                       kkal:
*                         type: integer
*                         description: Калорийность (на 100 гр.)
*                       user:
*                         type: object
*                         properties:
*                           id:
*                             type: integer
*                             description: Id пользователя
*                       category:
*                         type: object
*                         properties:
*                           id:
*                             type: integer
*                             description: Id категории продукта
*                           title:
*                             type: string
*                             description: Название категории продукта
*                       favorite:
*                         type: boolean
*                         description: Признак добавления в избранное у авторизованного пользователя
*                       pinned:
*                         type: boolean
*                         description: Признак добавления в закрепленное у авторизованного пользователя
*       401:
*         description: Ошибка авторизации
*/
router.get('/', JwtGuard, foodCalorieTableControllers.getAllProducts)

router.post('/save-product', JwtGuard, foodCalorieTableControllers.saveNewProduct)

router.put('/update-product', JwtGuard, foodCalorieTableControllers.updateProduct)

// http://localhost:3031/api/food-calorie-table/remove-product/:productId
/**
* @swagger
* /api/food-calorie-table/remove-product/{productId}:
*   delete:
*     tags:
*       - Таблица калорийности продуктов
*     summary: Удаление продукта
*     security:
*	     - jwt: []
*     parameters:
*       - in: path
*         name: productId
*         required: true
*         schema:
*           type: integer
*         description: ID продукта
*     responses:
*       200:
*         description: Продукт удален
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
*                     removed:
*                       type: boolean
*                       description: Признак успешного удаления продукта
*                     productId:
*                       type: integer
*                       description: Id продукта
*       401:
*         description: Ошибка авторизации
*/
router.delete('/remove-product/:productId', JwtGuard, foodCalorieTableControllers.removeProduct)

router.post('/change-favorite-param', JwtGuard, foodCalorieTableControllers.changeFavoriteParam)

router.post('/change-pinned-param', JwtGuard, foodCalorieTableControllers.changePinnedParam)

export default router
