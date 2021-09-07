import { Request, Response } from "express"
import { getManager } from "typeorm"
import { Users } from "../db/entities/Users"
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
// import Users from '../models/Users'
// import Tokens from '../models/Tokens'

// http://localhost:3031/api/auth/register/
const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const entityManager = getManager()

    const candidate = await entityManager.findOne(Users, {where: {email: req.body.email}})

    if (candidate) {
      console.log('Пользователь найден')
    } else {
      console.log('Пользователь не найден')
    }

    return res.status(200).json({
      message: 'Пользователь зарегестрирован.'
    })
  } catch (error: any) {
    return res.status(500).json({
      message: 'Неизвестная ошибка.'
    })
  }

  // try {
  //   const candidate = await Users.findOne({
  //     where: {
  //       email: req.body.email
  //       // [Op.or]: [
  //       //   { email: req.body.email },
  //       //   { phone: req.body.phone }
  //       // ]
  //     }
  //   })

  //   if (!candidate) {
  //     // создать пользователя в БД
  //     try {
  //       // Создаем нового пользователя в БД
  //       const salt = bcrypt.genSaltSync(10)
  //       const password = req.body.password
  //       const newUser = await Users.create({
  //         email: req.body.email,
  //         phone: req.body.phone,
  //         password: bcrypt.hashSync(password, salt)
  //       })

  //       // Генерируем рефреш токен для нового пользователя
  //       const refreshToken = jwt.sign({
  //         id: newUser.id,
  //       }, keys.jwtRefresh, {expiresIn: '30d'})

  //       // Генерируем token для нового пользователя
  //       const accessToken = jwt.sign({
  //         id: newUser.id,
  //         refreshToken: refreshToken
  //       }, keys.jwt, {expiresIn: '15m'})

  //       // Создаем запись с токенами доступа для нового пользователя
  //       await Tokens.create({
  //         userId: candidate.id,
  //         accessToken,
  //         refreshToken
  //       })

  //       res.status(200).json(accessToken)
  //     } catch (error) {
  //       res.status(404).json({
  //         error,
  //         message: 'Внутренняя ошибка сервера. Попробуйте еще раз.'
  //       })
  //     }
  //   } else {
  //     // если пользователь существеует то возвращаем ошибку
  //     res.status(409).json({
  //       message: 'Введенный E-mail уже занят. Попробуйте авторизироваться или используйте другой E-mail.'
  //     })
  //   }
  // } catch (error) {
  //   console.log(error)

  //   res.status(400).json({
  //     message: 'Неверный запрос.'
  //   })
  // }
}

// http://localhost:3031/api/auth/login/
const login = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({
    message: 'Пользователь авторизован'
  })
  // try {
  //   const candidate = await Users.findOne({
  //     where: {
  //       email: req.body.email
  //     },
  //     include: {
  //       model: Tokens,
  //       attributes: {
  //         exclude: ['createdAt', 'updatedAt']
  //       },
  //       raw: true
  //     },
  //     attributes: {
  //       exclude: ['createdAt', 'updatedAt']
  //     }
  //   })
  //   // console.log(candidate.toJSON())

  //   if (candidate) {
  //     // Проверяем пароль, пользователь существует
  //     const passwordResult = bcrypt.compareSync(req.body.password, candidate.toJSON().password)
  
  //     if (passwordResult) {
  //       // Генерация refreshToken
  //       const refreshToken = jwt.sign({
  //         id: candidate.id,
  //       }, keys.jwtRefresh, {expiresIn: '30d'})

  //       // Генерация токена со сроком жизни 15 мин.
  //       const accessToken = jwt.sign({
  //         id: candidate.id,
  //         refreshToken: refreshToken
  //       }, keys.jwt, { expiresIn: '15m' })

  //       // Сохранение token и refreshToken в БД
  //       await Tokens.create({
  //         userId: candidate.id,
  //         accessToken,
  //         refreshToken
  //       })

  //       res.status(200).json(accessToken)
  //     } else {
  //       // Пароли не совпали
  //       res.status(401).json({
  //         message: 'Неверный пароль. Попробуйте еще раз или воспользуйтесь формой для восстановления пароля.'
  //       })
  //     }
  //   } else {
  //     // Пользователя нет, ошибка
  //     res.status(404).json({
  //       message: 'Пользователь с таким E-mail не найден.'
  //     })
  //   }
  // } catch (error) {
  //   console.log(error)

  //   res.status(400).json({
  //     message: 'Неверный запрос.'
  //   })
  // }
}

export default {
  register,
  login
}
