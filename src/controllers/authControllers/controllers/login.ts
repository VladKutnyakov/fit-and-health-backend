import { Request, Response } from "express"
import { getManager } from "typeorm"
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'
import { Users } from "../../../db/entities/Users"
import { Tokens } from "../../../db/entities/Tokens"

// http://localhost:3031/api/auth/login/
export const login = async (req: Request, res: Response): Promise<Response> => {
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

        return res.status(200).json(authUserAccessToken)
      } else {
        // Если пароли не совпали
        return res.status(401).json({
          message: 'Неверный пароль. Попробуйте еще раз или воспользуйтесь формой для восстановления пароля.'
        })
      }
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
