import express, { Router } from 'express'
import profileControllers from '../controllers/profileControllers'
import JwtGuard from '../middleware/Guards/JwtGuard'
const router: Router = express.Router()

// http://localhost:3031/api/profile/1
/**
 * @swagger
 * /api/profile/{profileId}:
 *   get:
 *     tags: [profiles]
 *     description: Получить данные о пользователе
 *     "parameters": [
 *        {
 *          "name": "profileId",
 *          "in": "path",
 *          "type": "number",
 *          "format": "number",
 *          "required": true
 *        }
 *      ]
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/:profileId', JwtGuard, profileControllers.login)

export default router
