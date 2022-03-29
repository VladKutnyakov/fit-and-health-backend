import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'
import { Users } from "../../../db/entities/Users"
import { Tokens } from "../../../db/entities/Tokens"

// http://localhost:3031/api/auth/register/
export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const candidate = await dataSource.manager.findOne(Users, {where: {email: req.body.email}})

    if (candidate) {
      // console.log('Пользователь найден')

      return res.status(409).json({
        message: 'Введенный E-mail уже используется. Попробуйте авторизироваться или используйте другой адрес электронной почты.'
      })
    } else {
      // console.log('Пользователь не найден')

      // Создаем нового пользователя в БД
      const CreatedUserAccessToken = await dataSource.transaction(async transactionalEntityManager => {

        // Создать пользователя
        const NewUser = new Users()
        NewUser.email = req.body.email
        NewUser.phone = req.body.phone
        NewUser.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))

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
