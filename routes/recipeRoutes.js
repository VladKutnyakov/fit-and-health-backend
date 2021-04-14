const express = require('express')
// const passport = require('passport')
const controller = require('../controllers/recipeControllers')
const router = express.Router()

// passport не дает выполнять корректно fetch запросы axios. 
// перепроверить как работает паспорт и вообще авторизация и перенастроить . поправить все

// http://localhost:3000/api/recipe/:id
router.get('/:id', controller.getRecipe)

module.exports = router
