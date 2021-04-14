const express = require('express')
const controller = require('../controllers/authControllers')
const router = express.Router()

// http://localhost:3031/api/auth/login/
router.post('/login', controller.login)
// http://localhost:3031/api/auth/register/
router.post('/register', controller.register)

module.exports = router
