import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { dataSource } from '../../dataSource'
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
  // найти все токены
  // удалить те у которых истек срок
  // Если токен текущий остался все ок, если нет - ошибка авторизации

  // const DeletedToken = await dataSource
  //   .createQueryBuilder()
  //   .delete()
  //   .from(Tokens)
  //   .where(`accessToken = '${AccessToken}'`)
  //   .execute()
  // // console.log(DeletedToken)


  if (req.headers && req.headers.authorization) {
    const AccessToken: string = req.headers.authorization.replace('Bearer ', '')
    const DecodedToken: any = jwt.decode(AccessToken, keys.jwt)

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
    req.body.userId = null
    next()
  }
}
