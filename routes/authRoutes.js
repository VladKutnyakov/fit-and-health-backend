const express = require('express')
const authControllers = require('../controllers/authControllers')
const router = express.Router()

// http://localhost:3031/api/auth/login/
router.post('/login', authControllers.login)
// http://localhost:3031/api/auth/register/
router.post('/register', authControllers.register)

module.exports = router
