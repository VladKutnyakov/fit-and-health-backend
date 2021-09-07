import express, { Router } from 'express'
import authControllers from '../controllers/authControllers'
const router: Router = express.Router()

// http://localhost:3031/api/auth/login/
router.post('/login', authControllers.login)
// http://localhost:3031/api/auth/register/
router.post('/register', authControllers.register)

export default router
