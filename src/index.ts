if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

import express, { Application } from "express"
import cors from 'cors'
import helmet from 'helmet'
import consola from 'consola'
import "reflect-metadata"
import { createConnection } from 'typeorm'

// Импорт роутов
import authRoutes from './routes/authRoutes'
// import mealPlanerRoutes from './routes/mealPlanerRoutes'
// import foodCalorieTableRoutes from './routes/foodCalorieTableRoutes'
// import recipesBookRoutes from './routes/recipesBookRoutes'
// import recipeRoutes from './routes/recipeRoutes'
// import trainingDiaryRoutes from './routes/trainingDiaryRoutes'
// import ExercisesRoutes from './routes/ExercisesRoutes'
// import settingsRoutes from './routes/settingsRoutes'

const app: Application = express()

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
// app.use('/api/meal-planer', mealPlanerRoutes)
// app.use('/api/food-calorie-table', foodCalorieTableRoutes)
// app.use('/api/recipes-book', recipesBookRoutes)
// app.use('/api/recipe', recipeRoutes)
// app.use('/api/training-diary', trainingDiaryRoutes)
// app.use('/api/exercises', ExercisesRoutes)
// app.use('/api/settings', settingsRoutes)

// Подключение к базе данных
createConnection().then(connection => {
  consola.ready({
    message: `DB connected success`,
    badge: true
  })
}).catch(error => console.log(error))

// Запуск сервера
const HOST: string = process.env.HOST || 'localhost'
const PORT: any = process.env.PORT || 3031

app.listen(PORT, HOST, () => {
  consola.ready({
    message: `Server listening on http://${HOST}:${PORT}`,
    badge: true
  })
})
