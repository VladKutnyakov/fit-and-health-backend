const express = require('express')
const recipesBookControllers = require('../controllers/recipesBookControllers')
const router = express.Router()

// passport не дает выполнять корректно fetch запросы axios. 
// перепроверить как работает паспорт и вообще авторизация и перенастроить . поправить все

// http://localhost:3000/api/recipe-book
router.get('/', recipesBookControllers.getRecipes)

module.exports = router
