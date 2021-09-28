import express, { Router } from 'express'
import profileControllers from '../controllers/profileControllers'
import JwtGuard from '../middleware/Guards/JwtGuard'
const router: Router = express.Router()

// http://localhost:3031/api/profile/1
router.get('/:profileId', JwtGuard, profileControllers.login)

export default router
