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
*         description: Список продуктов.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 id:
*                   type: integer
*                   description: Id информации профиля
*                 title:
*                   type: string
*                   description: Название продукта
*       401:
*         description: Ошибка авторизации
*/
router.get('/', JwtGuard, foodCalorieTableControllers.getAllProducts)
// router.post('/save-product', JwtGuard, foodCalorieTableControllers.saveNewProduct)
// router.put('/update-product', JwtGuard, foodCalorieTableControllers.updateProduct)
// router.delete('/remove-product/:id', JwtGuard, foodCalorieTableControllers.removeProduct)
// router.post('/change-favorite-param', JwtGuard, foodCalorieTableControllers.changeFavoriteParam)
// router.post('/change-pinned-param', JwtGuard, foodCalorieTableControllers.changePinnedParam)

export default router
