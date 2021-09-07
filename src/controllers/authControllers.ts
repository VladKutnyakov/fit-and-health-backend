import { Request, Response } from "express"
import { getManager, Transaction, TransactionManager } from "typeorm"
import { Users } from "../db/entities/Users"
import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'

// http://localhost:3031/api/auth/register/
const register = async (req: Request, res: Response): Promise<Response> => {

  try {
    const entityManager = getManager()

    const candidate = await entityManager.findOne(Users, {where: {email: req.body.email}})

    if (candidate) {
      // console.log('Пользователь найден')

      return res.status(409).json({
        message: 'Введенный E-mail уже используется. Попробуйте авторизироваться или используйте другой адрес электронной почты.'
      })
    } else {
      // console.log('Пользователь не найден')

      // Создаем нового пользователя в БД
      // const salt = bcrypt.genSaltSync(10)
      // const password = req.body.password

      // @Transaction()
      // save(@TransactionManager() manager: EntityManager, user: Users) {
      //   let stud = new Student();
      //   stud.name = student.name;
      //   stud.entered = normalizeNumber(student.entered, 'Bad year entered');
      //   stud.grade = normalizeNumber(student.grade, 'Bad grade');
      //   stud.gender = student.gender;
      //   await this.save(stud);
      //   return stud.id;
      // }

      // const newUser = await Users.create({
      //   email: req.body.email,
      //   phone: req.body.phone,
      //   password: bcrypt.hashSync(password, salt)
      // })

      // // Генерируем рефреш токен для нового пользователя
      // const refreshToken = jwt.sign({
      //   id: newUser.id,
      // }, keys.jwtRefresh, {expiresIn: '30d'})

      // // Генерируем token для нового пользователя
      // const accessToken = jwt.sign({
      //   id: newUser.id,
      //   refreshToken: refreshToken
      // }, keys.jwt, {expiresIn: '15m'})

      // // Создаем запись с токенами доступа для нового пользователя
      // await Tokens.create({
      //   userId: candidate.id,
      //   accessToken,
      //   refreshToken
      // })

      // return res.status(200).json(accessToken)
      return res.status(200).json({mess: '123'})
    }
  } catch (error: any) {
    return res.status(500).json({
      message: 'Неизвестная ошибка.'
    })
  }

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
