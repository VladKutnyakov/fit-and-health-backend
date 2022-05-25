import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'
// import { dataSource } from '../../dataSource'
// import { Tokens } from "../../db/entities/Tokens"

interface I_JwtKeys {
  jwt: any
  // jwtRefresh: any
}

const keys: I_JwtKeys = {
  jwt: process.env.JWT,
  // jwtRefresh: process.env.JWT_REFRESH
}

// Guard проверяет token на валидность и обновляет его в БД, прикрепляя обновлденный token к req.body.updatedToken
export default async function JwtGuard (req: Request, res: Response, next: NextFunction) {
  // Проверка наличия токена авторизации в headers запроса
  if (req.headers && req.headers.authorization) {
    // Получение токена и установка id пользователя в body запроса, для удобной работы в контроллерах
    const token: string = req.headers.authorization.replace('Bearer ', '')
    const decodedToken: any = jwt.decode(token, keys.jwt)

    // Проверка валидности токена
    jwt.verify(token, keys.jwt, async (error: any) => {
      if (error) {
        return res.status(401).json({
          errors: [
            {
              field: null,
              errorMessage: 'Ошибка авторизации.'
            }
          ]
        })
      } else {
        // Если token валиден к request body прикрепляется свойство userId.
        req.body.userId = decodedToken.id
        next()
      }
    })
  } else {
    return res.status(401).json({
      errors: [
        {
          field: null,
          errorMessage: 'Отсутствуют данные для авторизации.'
        }
      ]
    })
  }
}
