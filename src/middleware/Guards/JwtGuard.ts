import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

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
    const token: string = req.headers.authorization.replace('Bearer ', '')
    const decodedToken: any = jwt.decode(token, keys.jwt)

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
        req.body.userId = decodedToken.id
        next()
      }
    })
  } else {
    req.body.userId = null
    next()
  }
}
