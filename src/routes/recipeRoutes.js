const express = require('express')
const recipeControllers = require('../controllers/recipeControllers')
const router = express.Router()

// passport не дает выполнять корректно fetch запросы axios. 
// перепроверить как работает паспорт и вообще авторизация и перенастроить . поправить все

// http://localhost:3000/api/recipe/:id
router.get('/:id', recipeControllers.getRecipe)

module.exports = router
