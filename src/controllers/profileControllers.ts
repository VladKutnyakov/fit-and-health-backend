import { Request, Response } from "express"
import { getManager } from "typeorm"
// import bcrypt from 'bcrypt'
// import jwt, { Secret } from 'jsonwebtoken'
import { Users } from "../db/entities/Users"
// import { Tokens } from "../db/entities/Tokens"

// http://localhost:3031/api/auth/login/
const login = async (req: Request, res: Response): Promise<Response> => {

  try {
    const targetUserId = req.params.profileId
    console.log(targetUserId, req.body.userId)

    if (req.body.userId == targetUserId) {
      // Данные об авторизованном пользователе
      return res.status(200).json({
        message: 'full profile data'
      })
    } else {
      // Данные о НЕавторизованном пользователе
      return res.status(200).json({
        message: 'part profile data'
      })
    }

  } catch (erro: any) {
    return res.status(500).json({
      message: 'Неизвестная ошибка.'
    })
  }

}

export default {
  login
}
