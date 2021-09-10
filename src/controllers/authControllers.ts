import { Request, Response } from "express"
import { getManager } from "typeorm"
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'
import { Users } from "../db/entities/Users"
import { Tokens } from "../db/entities/Tokens"

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
      const CreatedUserAccessToken = await getManager().transaction(async transactionalEntityManager => {

        // Создать пользователя
        const NewUser = new Users()
        NewUser.email = req.body.email
        NewUser.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
        NewUser.firstName = null
        NewUser.middleName = null
        NewUser.lastName = null
        NewUser.birthday = null
        NewUser.phone = null
        NewUser.gender = null
        NewUser.weight = null
        NewUser.height = null
        NewUser.city = null
        NewUser.site = null
        NewUser.vk = null
        NewUser.facebook = null
        NewUser.instagram = null
        NewUser.youtube = null
        NewUser.twitter = null
        NewUser.skype = null

        const CreatedUser = await transactionalEntityManager.save(NewUser)

        // Генерируем рефреш токен для созданного пользователя
        const JwtRefreshKey: Secret = process.env.JWT_REFRESH || ''
        const RefreshToken = jwt.sign({
          id: CreatedUser.id,
        }, JwtRefreshKey, {expiresIn: '30d'})

        // Генерируем token для созданного пользователя
        const JwtKey: Secret = process.env.JWT || ''
        const AccessToken = jwt.sign({
          id: CreatedUser.id,
          refreshToken: RefreshToken
        }, JwtKey, {expiresIn: '15m'})

        // Создаем запись с токенами доступа для созданного пользователя
        const CreatedTokens = new Tokens()
        CreatedTokens.accessToken = AccessToken
        CreatedTokens.refreshToken = RefreshToken
        CreatedTokens.user = CreatedUser

        await transactionalEntityManager.save(CreatedTokens)

        return AccessToken
      })

      return res.status(200).json(CreatedUserAccessToken)
    }
  } catch (error: any) {
    return res.status(500).json({
      message: 'Неизвестная ошибка.'
    })
  }

}

// http://localhost:3031/api/auth/login/
const login = async (req: Request, res: Response): Promise<Response> => {

  try {
    const entityManager = getManager()

    const candidate = await entityManager.findOne(Users, {where: {email: req.body.email}})

    if (candidate) {
      // Проверяем пароль
      const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)

      if (passwordResult) {
        // Авторизуем пользователя
        const authUserAccessToken = await getManager().transaction(async transactionalEntityManager => {
          // Генерируем рефреш токен для найденного пользователя
          const JwtRefreshKey: Secret = process.env.JWT_REFRESH || ''
          const RefreshToken = jwt.sign({
            id: candidate.id,
          }, JwtRefreshKey, {expiresIn: '30d'})

          // Генерируем token для найденного пользователя
          const JwtKey: Secret = process.env.JWT || ''
          const AccessToken = jwt.sign({
            id: candidate.id,
            refreshToken: RefreshToken
          }, JwtKey, {expiresIn: '15m'})

          // Создаем запись с токенами доступа для созданного пользователя
          const CreatedTokens = new Tokens()
          CreatedTokens.accessToken = AccessToken
          CreatedTokens.refreshToken = RefreshToken
          CreatedTokens.user = candidate

          await transactionalEntityManager.save(CreatedTokens)

          return AccessToken
        })

        res.status(200).json(authUserAccessToken)
      } else {
        // Если пароли не совпали
        return res.status(401).json({
          message: 'Неверный пароль. Попробуйте еще раз или воспользуйтесь формой для восстановления пароля.'
        })
      }

      // этот return никогда не вызовется но компилятор требует возвращать что-то...
      return res.status(200)
    } else {
      return res.status(401).json({
        message: 'Пользователь не найден.'
      })
    }
  } catch (erro: any) {
    return res.status(500).json({
      message: 'Неизвестная ошибка.'
    })
  }

}

export default {
  register,
  login
}
