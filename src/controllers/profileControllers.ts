import { Request, Response } from "express"
import { getManager } from "typeorm"
// import bcrypt from 'bcrypt'
// import jwt, { Secret } from 'jsonwebtoken'
import { Users } from "../db/entities/Users"
// import { Tokens } from "../db/entities/Tokens"

// http://localhost:3031/api/auth/login/
const fetchProfileInfo = async (req: Request, res: Response): Promise<Response> => {

  try {
    const targetUserId = req.params.profileId
    // console.log(targetUserId, req.body.userId)

    if (req.body.userId == targetUserId) {
      // Данные об авторизованном пользователе
      const entityManager = getManager()

      const UserInfo = await entityManager.findOne(
        Users,
        {
          select: [
            'id',
            'firstName',
            'middleName',
            'lastName',
            'birthday',
            'phone',
            'gender',
            'weight',
            'height',
            'city',
            'site',
            'vk',
            'facebook',
            'instagram',
            'youtube',
            'twitter',
            'skype',
          ],
          where: {
            id: req.body.userId
          }
        }
      )

      // console.log(UserInfo)

      return res.status(200).json(UserInfo)
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
  fetchProfileInfo
}
