import express, { Router } from 'express'
import exercisesControllers from '../controllers/exercises/index'
import JwtGuard from '../middleware/Guards/JwtGuard'
const router: Router = express.Router()

// http://localhost:3031/api/exercises/exercises-list
/**
* @swagger
* /api/exercises/exercises-list:
*   get:
*     tags:
*       - Справочник упражнений
*     summary: Список упражнений
*     security:
*       - jwt: []
*     responses:
*       200:
*         description: Список упражнений
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   id:
*                     type: integer
*                     description: ID упражнения
*                   title:
*                     type: string
*                     description: Название упражнения
*                   techniqueDescription:
*                     type: string
*                     description: Описание упражнения
*                   power:
*                     type: number
*                     description: Акцент упражнения на силу (в процентах)
*                   endurance:
*                     type: number
*                     description: Акцент упражнения на выносливость (в процентах)
*                   flexibility:
*                     type: number
*                     description: Акцент упражнения на гибкость (в процентах)
*                   cardio:
*                     type: number
*                     description: Акцент упражнения на кардио (в процентах)
*                   type:
*                     type: object
*                     properties:
*                       id:
*                         type: number
*                         description: ID типа упражнения
*                       title:
*                         type: string
*                         description: Название типа упражнения
*                   sort:
*                     type: object
*                     properties:
*                       id:
*                         type: number
*                         description: ID 
*                       title:
*                         type: string
*                         description: Название 
*                   exertion:
*                     type: object
*                     properties:
*                       id:
*                         type: number
*                         description: ID 
*                       title:
*                         type: string
*                         description: Название 
*                   equipment:
*                     type: object
*                     properties:
*                       id:
*                         type: number
*                         description: ID 
*                       title:
*                         type: string
*                         description: Название 
*                   skill:
*                     type: object
*                     properties:
*                       id:
*                         type: number
*                         description: ID уровня навыка (мастерства)
*                       excellenceTitle:
*                         type: string
*                         description: Название уровня навыка (мастерства)
*                       complexityTitle:
*                         type: string
*                         description: Название уровня навыка (сложности)
*                       value:
*                         type: number
*                         description: Числовое обозначение уровня навыка (мастерства)
*                   muscleGroup:
*                     type: object
*                     properties:
*                       id:
*                         type: number
*                         description: ID мышечной группы
*                       title:
*                         type: string
*                         description: Название мышечной группы
*                   additionalMuscles:
*                     type: array
*                     items:
*                       type: object
*                       properties:
*                         id:
*                           type: number
*                           description: ID мышечной группы
*                         title:
*                           type: string
*                           description: Название мышечной группы
*                   favorite:
*                     type: boolean
*                     description: Добавлено в избранное (признак)
*                   pinned:
*                     type: boolean
*                     description: Добавлено в закрепленное (признак)
*                   user:
*                     type: object
*                     properties:
*                       id:
*                         type: integer
*                         description: ID пользователя
*       401:
*         description: Ошибка авторизации
*/
router.get('/exercises-list', JwtGuard, exercisesControllers.fetchExercisesList)

// http://localhost:3031/api/exercises/exercises-by-muscles
/**
* @swagger
* /api/exercises/exercises-by-muscles:
*   get:
*     tags:
*       - Справочник упражнений
*     summary: Список упражнений по мышечным группам
*     security:
*       - jwt: []
*     responses:
*       200:
*         description: Список упражнений по мышечным группам
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   id:
*                     type: integer
*                     description: ID мышечной группы
*                   title:
*                     type: string
*                     description: Название мышечной группы
*                   exercises:
*                     type: array
*                     items:
*                       type: object
*                       properties:
*                         id:
*                           type: integer
*                           description: ID упражнения
*                         title:
*                           type: string
*                           description: Название упражнения
*                         additionalMuscles:
*                           type: array
*                           items:
*                             type: object
*                             properties:
*                               id:
*                                 type: number
*                                 description: ID мышечной группы
*                               title:
*                                 type: string
*                                 description: Название мышечной группы
*                         user:
*                           type: object
*                           properties:
*                             id:
*                               type: integer
*                               description: ID пользователя
*       401:
*         description: Ошибка авторизации
*/
router.get('/exercises-by-muscles', JwtGuard, exercisesControllers.fetchExercisesListByMuscles)

// http://localhost:3031/api/exercises/exercise-info/:exerciseId
/**
* @swagger
* /api/exercises/exercise-info/{exerciseId}:
*   get:
*     tags:
*       - Справочник упражнений
*     summary: Информация об упражнении
*     security:
*       - jwt: []
*     parameters:
*       - in: path
*         name: exerciseId
*         required: true
*         schema:
*           type: integer
*         description: ID упражнения
*     responses:
*       200:
*         description: Информация об упражнении
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 updatedToken:
*                   type: string
*                   description: Обновленный токен авторизации
*                 data:
*                   type: object
*                   properties:
*                     id:
*                       type: integer
*                       description: ID упражнения
*                     title:
*                       type: string
*                       description: Название упражнения
*                     type:
*                       type: string
*                       description: Тип упражнения
*                     sort:
*                       type: string
*                       description: Вид упражнения
*                     equipment:
*                       type: string
*                       description: Необходимое оборудование для упражнения
*                     exertion:
*                       type: string
*                       description: Прилагаемое усилие
*                     practiceLevel:
*                       type: string
*                       description: Уровень подготовки (необходимый для выполнения)
*                     techniqueDescription:
*                       type: string
*                       description: Описание упражнения
*                     muscleGroup:
*                       type: object
*                       properties:
*                         id:
*                           type: number
*                           description: ID мышечной группы
*                         title:
*                           type: string
*                           description: Название мышечной группы
*                     additionalMuscles:
*                       type: array
*                       items:
*                         type: object
*                         properties:
*                           id:
*                             type: number
*                             description: ID мышечной группы
*                           title:
*                             type: string
*                             description: Название мышечной группы
*                     user:
*                       type: object
*                       properties:
*                         id:
*                           type: number
*                           description: ID пользователя
*       401:
*         description: Ошибка авторизации
*/
router.get('/exercise-info/:exerciseId', JwtGuard, exercisesControllers.fetchExerciseInfo)

// http://localhost:3031/api/exercises/save-new-exercise
/**
* @swagger
* /api/exercises/save-new-exercise:
*   post:
*     tags:
*       - Справочник упражнений
*     summary: Создание упражнения
*     security:
*       - jwt: []
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             required: true
*             properties:
*               exercise:
*                 type: object
*                 properties:
*                   id:
*                     type: integer
*                     description: ID упражнения
*                   title:
*                     type: string
*                     description: Название упражнения
*                   techniqueDescription:
*                     type: string
*                     description: Описание упражнения
*                   type:
*                     type: object
*                     properties:
*                       id:
*                         type: number
*                         description: ID типа упражнения
*                       title:
*                         type: string
*                         description: Тип упражнения
*                   sort:
*                     type: object
*                     properties:
*                       id:
*                         type: number
*                         description: ID вида упражнения
*                       title:
*                         type: string
*                         description: Вид упражнения
*                   equipment:
*                     type: object
*                     properties:
*                       id:
*                         type: number
*                         description: ID оборудование для упражнения
*                       title:
*                         type: string
*                         description: Необходимое оборудование для упражнения
*                   exertion:
*                     type: object
*                     properties:
*                       id:
*                         type: number
*                         description: ID вариантнов училия
*                       title:
*                         type: string
*                         description: Прилагаемое усилие
*                   skill:
*                     type: object
*                     properties:
*                       id:
*                         type: number
*                         description: ID уровня навыка
*                       excellenceTitle:
*                         type: string
*                         description: Название уровня навыка (мастерства)
*                       complexityTitle:
*                         type: string
*                         description: Название уровня навыка (сложности)
*                       value:
*                         type: number
*                         description: Числовое обозначение уровня навыка (мастерства)
*                   trainingPlace:
*                     type: object
*                     properties:
*                       id:
*                         type: number
*                         description: ID предпочтительного места тренировки
*                       title:
*                         type: string
*                         description: Название предпочтительного места тренировки
*                   muscleGroup:
*                     type: object
*                     properties:
*                       id:
*                         type: number
*                         description: ID мышечной группы
*                       title:
*                         type: string
*                         description: Название мышечной группы
*                   additionalMuscles:
*                     type: array
*                     items:
*                       type: object
*                       properties:
*                         id:
*                           type: number
*                           description: ID мышечной группы
*                         title:
*                           type: string
*                           description: Название мышечной группы
*                   power:
*                     type: number
*                     description: Акцент упражнения для развитии силы
*                   endurance:
*                     type: number
*                     description: Акцент упражнения для развитии выносливости
*                   flexibility:
*                     type: number
*                     description: Акцент упражнения для развитии гибкости
*                   cardio:
*                     type: number
*                     description: Акцент упражнения для развитии кардио
*                   user:
*                     type: object
*                     properties:
*                       id:
*                         type: number
*                         description: ID пользователя
*     responses:
*       200:
*         description: Созданное упражнении
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 updatedToken:
*                   type: string
*                   description: Обновленный токен авторизации
*                 data:
*                   type: object
*                   properties:
*                     id:
*                       type: integer
*                       description: ID упражнения
*                     title:
*                       type: string
*                       description: Название упражнения
*                     techniqueDescription:
*                       type: string
*                       description: Описание упражнения
*                     type:
*                       type: object
*                       properties:
*                         id:
*                           type: number
*                           description: ID типа упражнения
*                         title:
*                           type: string
*                           description: Тип упражнения
*                     sort:
*                       type: object
*                       properties:
*                         id:
*                           type: number
*                           description: ID вида упражнения
*                         title:
*                           type: string
*                           description: Вид упражнения
*                     equipment:
*                       type: object
*                       properties:
*                         id:
*                           type: number
*                           description: ID оборудование для упражнения
*                         title:
*                           type: string
*                           description: Необходимое оборудование для упражнения
*                     exertion:
*                       type: object
*                       properties:
*                         id:
*                           type: number
*                           description: ID вариантнов училия
*                         title:
*                           type: string
*                           description: Прилагаемое усилие
*                     skill:
*                       type: object
*                       properties:
*                         id:
*                           type: number
*                           description: ID уровня навыка
*                         excellenceTitle:
*                           type: string
*                           description: Название уровня навыка (мастерства)
*                         complexityTitle:
*                           type: string
*                           description: Название уровня навыка (сложности)
*                         value:
*                           type: number
*                           description: Числовое обозначение уровня навыка (мастерства)
*                     trainingPlace:
*                       type: object
*                       properties:
*                         id:
*                           type: number
*                           description: ID предпочтительного места тренировки
*                         title:
*                           type: string
*                           description: Название предпочтительного места тренировки
*                     muscleGroup:
*                       type: object
*                       properties:
*                         id:
*                           type: number
*                           description: ID мышечной группы
*                         title:
*                           type: string
*                           description: Название мышечной группы
*                     additionalMuscles:
*                       type: array
*                       items:
*                         type: object
*                         properties:
*                           id:
*                             type: number
*                             description: ID мышечной группы
*                           title:
*                             type: string
*                             description: Название мышечной группы
*                     power:
*                       type: number
*                       description: Акцент упражнения для развитии силы
*                     endurance:
*                       type: number
*                       description: Акцент упражнения для развитии выносливости
*                     flexibility:
*                       type: number
*                       description: Акцент упражнения для развитии гибкости
*                     cardio:
*                       type: number
*                       description: Акцент упражнения для развитии кардио
*                     user:
*                       type: object
*                       properties:
*                         id:
*                           type: number
*                           description: ID пользователя
*       401:
*         description: Ошибка авторизации
*/
router.post('/save-new-exercise', JwtGuard, exercisesControllers.saveNewExercise)

// http://localhost:3031/api/exercises/update-exercise
/**
* @swagger
* /api/exercises/update-exercise:
*   put:
*     tags:
*       - Справочник упражнений
*     summary: Редактированние упражнения
*     security:
*       - jwt: []
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             required: true
*             properties:
*               exercise:
*                 type: object
*                 properties:
*                   id:
*                     type: integer
*                     description: ID упражнения
*                   title:
*                     type: string
*                     description: Название упражнения
*                   techniqueDescription:
*                     type: string
*                     description: Описание упражнения
*                   type:
*                     type: object
*                     properties:
*                       id:
*                         type: number
*                         description: ID типа упражнения
*                       title:
*                         type: string
*                         description: Тип упражнения
*                   sort:
*                     type: object
*                     properties:
*                       id:
*                         type: number
*                         description: ID вида упражнения
*                       title:
*                         type: string
*                         description: Вид упражнения
*                   equipment:
*                     type: object
*                     properties:
*                       id:
*                         type: number
*                         description: ID оборудование для упражнения
*                       title:
*                         type: string
*                         description: Необходимое оборудование для упражнения
*                   exertion:
*                     type: object
*                     properties:
*                       id:
*                         type: number
*                         description: ID вариантнов училия
*                       title:
*                         type: string
*                         description: Прилагаемое усилие
*                   skill:
*                     type: object
*                     properties:
*                       id:
*                         type: number
*                         description: ID уровня навыка
*                       excellenceTitle:
*                         type: string
*                         description: Название уровня навыка (мастерства)
*                       complexityTitle:
*                         type: string
*                         description: Название уровня навыка (сложности)
*                       value:
*                         type: number
*                         description: Числовое обозначение уровня навыка (мастерства)
*                   muscleGroup:
*                     type: object
*                     properties:
*                       id:
*                         type: number
*                         description: ID мышечной группы
*                       title:
*                         type: string
*                         description: Название мышечной группы
*                   additionalMuscles:
*                     type: array
*                     items:
*                       type: object
*                       properties:
*                         id:
*                           type: number
*                           description: ID мышечной группы
*                         title:
*                           type: string
*                           description: Название мышечной группы
*                   power:
*                     type: number
*                     description: Акцент упражнения для развитии силы
*                   endurance:
*                     type: number
*                     description: Акцент упражнения для развитии выносливости
*                   flexibility:
*                     type: number
*                     description: Акцент упражнения для развитии гибкости
*                   cardio:
*                     type: number
*                     description: Акцент упражнения для развитии кардио
*                   user:
*                     type: object
*                     properties:
*                       id:
*                         type: number
*                         description: ID пользователя
*     responses:
*       200:
*         description: Отредактированное упражнение
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 updatedToken:
*                   type: string
*                   description: Обновленный токен авторизации
*                 data:
*                   type: object
*                   properties:
*                     id:
*                       type: integer
*                       description: ID упражнения
*                     title:
*                       type: string
*                       description: Название упражнения
*                     techniqueDescription:
*                       type: string
*                       description: Описание упражнения
*                     type:
*                       type: object
*                       properties:
*                         id:
*                           type: number
*                           description: ID типа упражнения
*                         title:
*                           type: string
*                           description: Тип упражнения
*                     sort:
*                       type: object
*                       properties:
*                         id:
*                           type: number
*                           description: ID вида упражнения
*                         title:
*                           type: string
*                           description: Вид упражнения
*                     equipment:
*                       type: object
*                       properties:
*                         id:
*                           type: number
*                           description: ID оборудование для упражнения
*                         title:
*                           type: string
*                           description: Необходимое оборудование для упражнения
*                     exertion:
*                       type: object
*                       properties:
*                         id:
*                           type: number
*                           description: ID вариантнов училия
*                         title:
*                           type: string
*                           description: Прилагаемое усилие
*                     skill:
*                       type: object
*                       properties:
*                         id:
*                           type: number
*                           description: ID уровня навыка
*                         excellenceTitle:
*                           type: string
*                           description: Название уровня навыка (мастерства)
*                         complexityTitle:
*                           type: string
*                           description: Название уровня навыка (сложности)
*                         value:
*                           type: number
*                           description: Числовое обозначение уровня навыка (мастерства)
*                     muscleGroup:
*                       type: object
*                       properties:
*                         id:
*                           type: number
*                           description: ID мышечной группы
*                         title:
*                           type: string
*                           description: Название мышечной группы
*                     additionalMuscles:
*                       type: array
*                       items:
*                         type: object
*                         properties:
*                           id:
*                             type: number
*                             description: ID мышечной группы
*                           title:
*                             type: string
*                             description: Название мышечной группы
*                     power:
*                       type: number
*                       description: Акцент упражнения для развитии силы
*                     endurance:
*                       type: number
*                       description: Акцент упражнения для развитии выносливости
*                     flexibility:
*                       type: number
*                       description: Акцент упражнения для развитии гибкости
*                     cardio:
*                       type: number
*                       description: Акцент упражнения для развитии кардио
*                     user:
*                       type: object
*                       properties:
*                         id:
*                           type: number
*                           description: ID пользователя
*       401:
*         description: Ошибка авторизации
*/
router.put('/update-exercise', JwtGuard, exercisesControllers.updateExercise)

// http://localhost:3031/api/exercises/remove-exercise/:exerciseId
/**
* @swagger
* /api/exercises/remove-exercise/{exerciseId}:
*   delete:
*     tags:
*       - Справочник упражнений
*     summary: Удаление упражнения
*     security:
*       - jwt: []
*     parameters:
*       - in: path
*         name: exerciseId
*         required: true
*         schema:
*           type: integer
*         description: ID упражнения
*     responses:
*       200:
*         description: Упражнение удалено
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 exerciseId:
*                   type: number
*                   description: id удаленного упражнеия
*       401:
*         description: Ошибка авторизации
*/
router.delete('/remove-exercise/:exerciseId', JwtGuard, exercisesControllers.removeExercise)

// http://localhost:3031/api/exercises/change-pinned-param/:exerciseId
/**
* @swagger
* /api/exercises/change-pinned-param/{exerciseId}:
*   put:
*     tags:
*       - Справочник упражнений
*     summary: Изменить признак "закрепленного" для упражнения у пользователя
*     security:
*       - jwt: []
*     parameters:
*       - in: path
*         name: exerciseId
*         required: true
*         schema:
*           type: integer
*         description: ID упражнения
*     responses:
*       200:
*         description: Признак "закрепленного" для упражнения изменен
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 pinned:
*                   type: boolean
*                   description: Признак, является ли упражнение закрепленным для пользователя
*                 exerciseId:
*                   type: number
*                   description: ID упражнения
*       401:
*         description: Ошибка авторизации
*/
router.put('/change-pinned-param/:exerciseId', JwtGuard, exercisesControllers.changePinnedParam)

// http://localhost:3031/api/exercises/change-favorite-param/:exerciseId
/**
* @swagger
* /api/exercises/change-favorite-param/{exerciseId}:
*   put:
*     tags:
*       - Справочник упражнений
*     summary: Изменить признак "избранного" для упражнения у пользователя
*     security:
*       - jwt: []
*     parameters:
*       - in: path
*         name: exerciseId
*         required: true
*         schema:
*           type: integer
*         description: ID упражнения
*     responses:
*       200:
*         description: Признак "избранного" для упражнения изменен
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 favorite:
*                   type: boolean
*                   description: Признак, является ли упражнение избранным для пользователя
*                 exerciseId:
*                   type: number
*                   description: ID упражнения
*       401:
*         description: Ошибка авторизации
*/
router.put('/change-favorite-param/:exerciseId', JwtGuard, exercisesControllers.changeFavoriteParam)

// http://localhost:3031/api/exercises/muscles
/**
* @swagger
* /api/exercises/muscles:
*   get:
*     tags:
*       - Справочник упражнений
*     summary: Список мышечных групп
*     security:
*       - jwt: []
*     responses:
*       200:
*         description: Список мышечных групп
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   id:
*                     type: integer
*                     description: ID мышечной группы
*                   title:
*                     type: string
*                     description: Название мышечной группы
*       401:
*         description: Ошибка авторизации
*/
router.get('/muscles', JwtGuard, exercisesControllers.fetchMuscles)

// http://localhost:3031/api/exercises/exercise-types
/**
* @swagger
* /api/exercises/exercise-types:
*   get:
*     tags:
*       - Справочник упражнений
*     summary: Список типов для упражнений
*     security:
*       - jwt: []
*     responses:
*       200:
*         description: Список типов для упражнений
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   id:
*                     type: integer
*                     description: ID мышечной группы
*                   title:
*                     type: string
*                     description: Название мышечной группы
*       401:
*         description: Ошибка авторизации
*/
router.get('/exercise-types', JwtGuard, exercisesControllers.fetchExerciseTypes)

// http://localhost:3031/api/exercises/exercise-sorts
/**
* @swagger
* /api/exercises/exercise-sorts:
*   get:
*     tags:
*       - Справочник упражнений
*     summary: Список видов для упражнений
*     security:
*       - jwt: []
*     responses:
*       200:
*         description: Список видов для упражнений
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   id:
*                     type: integer
*                     description: ID мышечной группы
*                   title:
*                     type: string
*                     description: Название мышечной группы
*       401:
*         description: Ошибка авторизации
*/
router.get('/exercise-sorts', JwtGuard, exercisesControllers.fetchExerciseSorts)

// http://localhost:3031/api/exercises/exercise-exertions
/**
* @swagger
* /api/exercises/exercise-exertions:
*   get:
*     tags:
*       - Справочник упражнений
*     summary: Список усилий для выполнения упражнений
*     security:
*       - jwt: []
*     responses:
*       200:
*         description: Список усилий для выполнения упражнений
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   id:
*                     type: integer
*                     description: ID мышечной группы
*                   title:
*                     type: string
*                     description: Название мышечной группы
*       401:
*         description: Ошибка авторизации
*/
router.get('/exercise-exertions', JwtGuard, exercisesControllers.fetchExerciseExertions)

// http://localhost:3031/api/exercises/exercise-equipments
/**
* @swagger
* /api/exercises/exercise-equipments:
*   get:
*     tags:
*       - Справочник упражнений
*     summary: Список необходимого оборудования для выполнения упражнений
*     security:
*       - jwt: []
*     responses:
*       200:
*         description: Список необходимого оборудования для выполнения упражнений
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   id:
*                     type: integer
*                     description: ID мышечной группы
*                   title:
*                     type: string
*                     description: Название мышечной группы
*       401:
*         description: Ошибка авторизации
*/
router.get('/exercise-equipments', JwtGuard, exercisesControllers.fetchExerciseEquipments)

// http://localhost:3031/api/exercises/exercises-page-info
/**
* @swagger
* /api/exercises/exercises-page-info:
*   get:
*     tags:
*       - Справочник упражнений
*     summary: Общая информация по разделу "Справочник упражнений"
*     security:
*       - jwt: []
*     responses:
*       200:
*         description: Общая информация по разделу "Справочник упражнений"
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 exercises:
*                   type: number
*                   description: Кол-во упражнений в БД
*                 userExercises:
*                   type: number
*                   description: Кол-во упражнений пользователя в БД
*                 pinnedExercises:
*                   type: number
*                   description: Кол-во закрепленных упражнений у пользователя
*                 favoriteExercises:
*                   type: number
*                   description: Кол-во избранных упражнений у пользователя
*       401:
*         description: Ошибка авторизации
*/
router.get('/exercises-page-info', JwtGuard, exercisesControllers.fetchExercisePageInfo)

export default router
