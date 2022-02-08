import express, { Router } from 'express'
import foodCalorieTableControllers from '../controllers/foodCalorieTable/index'
import JwtGuard from '../middleware/Guards/JwtGuard'
const router: Router = express.Router()

// http://localhost:3031/api/food-calorie-table/product-categories
/**
* @swagger
* /api/food-calorie-table/product-categories:
*   get:
*     tags:
*       - Таблица калорийности продуктов
*     summary: Список категорий продуктов
*     security:
*       - jwt: []
*     responses:
*       200:
*         description: Список категорий продуктов
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
*                         description: Id категории
*                       title:
*                         type: string
*                         description: Название категории
*       401:
*         description: Ошибка авторизации
*/
router.get('/product-categories', JwtGuard, foodCalorieTableControllers.getProductCategories)

// http://localhost:3031/api/food-calorie-table/
/**
* @swagger
* /api/food-calorie-table/:
*   get:
*     tags:
*       - Таблица калорийности продуктов
*     summary: Список продуктов
*     security:
*       - jwt: []
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

// http://localhost:3031/api/food-calorie-table/save-product
/**
* @swagger
* /api/food-calorie-table/save-product:
*   post:
*     tags:
*       - Таблица калорийности продуктов
*     summary: Создать новый продукт
*     security:
*       - jwt: []
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             required: true
*             properties:
*               product:
*                 type: object
*                 properties:
*                   id:
*                     type: integer
*                     description: Id продукта
*                   title:
*                     type: string
*                     description: Название продукта
*                   protein:
*                     type: integer
*                     description: Кол-во белков (на 100 гр.)
*                   fats:
*                     type: integer
*                     description: Кол-во жиров (на 100 гр.)
*                   carb:
*                     type: integer
*                     description: Кол-во углеводов (на 100 гр.)
*                   kkal:
*                     type: integer
*                     description: Калорийность (на 100 гр.)
*                   user:
*                     type: object
*                     properties:
*                       id:
*                         type: integer
*                         description: Id пользователя
*                   category:
*                     type: object
*                     properties:
*                       id:
*                         type: integer
*                         description: Id категории продукта
*                       title:
*                         type: string
*                         description: Название категории продукта
*                   favorite:
*                     type: boolean
*                     description: Признак добавления в избранное у авторизованного пользователя
*                   pinned:
*                     type: boolean
*                     description: Признак добавления в закрепленное у авторизованного пользователя
*     responses:
*       200:
*         description: Данные продукта обновлены
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
*                     product:
*                       type: object
*                       properties:
*                         id:
*                           type: integer
*                           description: Id продукта
*                         title:
*                           type: string
*                           description: Название продукта
*                         protein:
*                           type: integer
*                           description: Кол-во белков (на 100 гр.)
*                         fats:
*                           type: integer
*                           description: Кол-во жиров (на 100 гр.)
*                         carb:
*                           type: integer
*                           description: Кол-во углеводов (на 100 гр.)
*                         kkal:
*                           type: integer
*                           description: Калорийность (на 100 гр.)
*                         user:
*                           type: object
*                           properties:
*                             id:
*                               type: integer
*                               description: Id пользователя
*                         category:
*                           type: object
*                           properties:
*                             id:
*                               type: integer
*                               description: Id категории продукта
*                             title:
*                               type: string
*                               description: Название категории продукта
*                         favorite:
*                           type: boolean
*                           description: Признак добавления в избранное у авторизованного пользователя
*                         pinned:
*                           type: boolean
*                           description: Признак добавления в закрепленное у авторизованного пользователя
*       401:
*         description: Ошибка авторизации
*/
router.post('/save-product', JwtGuard, foodCalorieTableControllers.saveNewProduct)

// http://localhost:3031/api/food-calorie-table/update-product
/**
* @swagger
* /api/food-calorie-table/update-product:
*   put:
*     tags:
*       - Таблица калорийности продуктов
*     summary: Обновить все данные у продукта
*     security:
*       - jwt: []
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             required: true
*             properties:
*               product:
*                 type: object
*                 properties:
*                   id:
*                     type: integer
*                     description: Id продукта
*                   title:
*                     type: string
*                     description: Название продукта
*                   protein:
*                     type: integer
*                     description: Кол-во белков (на 100 гр.)
*                   fats:
*                     type: integer
*                     description: Кол-во жиров (на 100 гр.)
*                   carb:
*                     type: integer
*                     description: Кол-во углеводов (на 100 гр.)
*                   kkal:
*                     type: integer
*                     description: Калорийность (на 100 гр.)
*                   category:
*                     type: object
*                     properties:
*                       id:
*                         type: integer
*                         description: Id категории продукта
*                       title:
*                         type: string
*                         description: Название категории продукта
*                   favorite:
*                     type: boolean
*                     description: Признак добавления в избранное у авторизованного пользователя
*                   pinned:
*                     type: boolean
*                     description: Признак добавления в закрепленное у авторизованного пользователя
*     responses:
*       200:
*         description: Данные продукта обновлены
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
*                     product:
*                       type: object
*                       properties:
*                         id:
*                           type: integer
*                           description: Id продукта
*                         title:
*                           type: string
*                           description: Название продукта
*                         protein:
*                           type: integer
*                           description: Кол-во белков (на 100 гр.)
*                         fats:
*                           type: integer
*                           description: Кол-во жиров (на 100 гр.)
*                         carb:
*                           type: integer
*                           description: Кол-во углеводов (на 100 гр.)
*                         kkal:
*                           type: integer
*                           description: Калорийность (на 100 гр.)
*                         category:
*                           type: object
*                           properties:
*                             id:
*                               type: integer
*                               description: Id категории продукта
*                             title:
*                               type: string
*                               description: Название категории продукта
*                         favorite:
*                           type: boolean
*                           description: Признак добавления в избранное у авторизованного пользователя
*                         pinned:
*                           type: boolean
*                           description: Признак добавления в закрепленное у авторизованного пользователя
*       401:
*         description: Ошибка авторизации
*/
router.put('/update-product', JwtGuard, foodCalorieTableControllers.updateProduct)

// http://localhost:3031/api/food-calorie-table/change-favorite-param/:productId
/**
* @swagger
* /api/food-calorie-table/change-favorite-param/{productId}:
*   put:
*     tags:
*       - Таблица калорийности продуктов
*     summary: Изменить признак "избранного" для продукта у пользователя
*     security:
*       - jwt: []
*     parameters:
*       - in: path
*         name: productId
*         required: true
*         schema:
*           type: integer
*         description: ID продукта
*     responses:
*       200:
*         description: Признак "избранного" для продукта изменен
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
*                     favorite:
*                       type: boolean
*                       description: Признак "изранного" для продукта у пользователя
*                     productId:
*                       type: integer
*                       description: Id продукта
*       401:
*         description: Ошибка авторизации
*/
router.put('/change-favorite-param/:productId', JwtGuard, foodCalorieTableControllers.changeFavoriteParam)

// http://localhost:3031/api/food-calorie-table/change-pinned-param/:productId
/**
* @swagger
* /api/food-calorie-table/change-pinned-param/{productId}:
*   put:
*     tags:
*       - Таблица калорийности продуктов
*     summary: Изменить признак "закрепленного" для продукта у пользователя
*     security:
*       - jwt: []
*     parameters:
*       - in: path
*         name: productId
*         required: true
*         schema:
*           type: integer
*         description: ID продукта
*     responses:
*       200:
*         description: Признак "закрепленного" для продукта изменен
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
*                     pinned:
*                       type: boolean
*                       description: Признак "закрепленного" для продукта у пользователя
*                     productId:
*                       type: integer
*                       description: Id продукта
*       401:
*         description: Ошибка авторизации
*/
router.put('/change-pinned-param/:productId', JwtGuard, foodCalorieTableControllers.changePinnedParam)

// http://localhost:3031/api/food-calorie-table/remove-product/:productId
/**
* @swagger
* /api/food-calorie-table/remove-product/{productId}:
*   delete:
*     tags:
*       - Таблица калорийности продуктов
*     summary: Удаление продукта
*     security:
*       - jwt: []
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

export default router
