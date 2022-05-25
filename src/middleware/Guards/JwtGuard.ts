import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { dataSource } from '../../dataSource'
// import { Users } from "../../db/entities/Users"
import { Tokens } from "../../db/entities/Tokens"
interface I_JwtKeys {
  jwt: any
  // jwtRefresh: any
}

const keys: I_JwtKeys = {
  jwt: process.env.JWT,
  // jwtRefresh: process.env.JWT_REFRESH
}

export default async function JwtGuard (req: Request, res: Response, next: NextFunction) {
  if (req.headers && req.headers.authorization) {
    const AccessToken: string = req.headers.authorization.replace('Bearer ', '')
    const DecodedToken: any = jwt.decode(AccessToken, keys.jwt)
    let accessTokenIsFound = false // признак есть токен в БД или нет

    // Удаление не валидных токенов из БД для пользователя --- НАЧАЛО
    const UserTokens = await dataSource.getRepository(Tokens)
      .createQueryBuilder('tokens')
      .select([
        'tokens.accessToken'
      ])
      .where(`tokens.userId = '${DecodedToken.id}'`)
      .leftJoin('tokens.user', 'user')
      .addSelect(['user.id'])
      .getMany()
    // console.log(UserTokens)

    for (let i = 0; i < UserTokens.length; i++) {
      if (UserTokens[i].accessToken === AccessToken) {
        accessTokenIsFound = true
      }

      jwt.verify(UserTokens[i].accessToken, keys.jwt, async (error: any) => {
        if (error) {
          await dataSource
            .createQueryBuilder()
            .delete()
            .from(Tokens)
            .where(`accessToken = '${UserTokens[i].accessToken}'`)
            .execute()
        }
      })
    }
    // Удаление не валидных токенов из БД для пользователя --- КОНЕЦ

    // Если accessToken был наден в БД проверяем его валидность
    if (accessTokenIsFound) {
      jwt.verify(AccessToken, keys.jwt, async (error: any) => {
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
          req.body.userId = DecodedToken.id
          next()
        }
      })
    } else {
      // Если accessToken НЕТ в БД
      return res.status(401).json({
        errors: [
          {
            field: null,
            errorMessage: 'Ошибка авторизации.'
          }
        ]
      })
    }
  } else {
    req.body.userId = null
    next()
  }
}
