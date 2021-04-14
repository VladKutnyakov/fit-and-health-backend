if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express= require('express')
const consola = require('consola')
const sequelize = require('./utils/dbConnect')
const cors = require('cors')
const helmet = require("helmet")

// Подключение файлов с роутами
const authRoutes = require('./routes/authRoutes')
const mealPlanerRoutes = require('./routes/mealPlanerRoutes')
const foodCalorieTableRoutes = require('./routes/foodCalorieTableRoutes')
const recipesBookRoutes = require('./routes/recipesBookRoutes')
const recipeRoutes = require('./routes/recipeRoutes')
const trainingDiaryRoutes = require('./routes/trainingDiaryRoutes')
const ExercisesRoutes = require('./routes/ExercisesRoutes')

const settingsRoutes = require('./routes/settingsRoutes')

const app = express()

// Подключение к базе MySQL
// Параметр {force: true} перезапишет данные таблицы, если такая таблица цже есть
sequelize.sync()
  .then(() => console.log('MySQL has been connected :)'))

const corsOptions = {
  "origin": "*",
  "methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS,HEAD",
  'Access-Control-Allow-Headers': 'Authorization',
  "preflightContinue": false,
  "optionsSuccessStatus": 200,
}
app.use(cors(corsOptions))
app.use(helmet())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Для получения доступа к папке напрямую
// localhost:3000/uploads/названиеКартинки.png
app.use('/uploads', express.static('uploads'))


// Routes
app.use('/api/auth', authRoutes)
app.use('/api/meal-planer', mealPlanerRoutes)
app.use('/api/food-calorie-table', foodCalorieTableRoutes)
app.use('/api/recipes-book', recipesBookRoutes)
app.use('/api/recipe', recipeRoutes)
app.use('/api/training-diary', trainingDiaryRoutes)
app.use('/api/exercises', ExercisesRoutes)


app.use('/api/settings', settingsRoutes)


// Listen the server
const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 3031

app.listen(PORT, HOST, () => {
  consola.ready({
    message: `Server listening on http://${HOST}:${PORT}`,
    badge: true
  })
})
