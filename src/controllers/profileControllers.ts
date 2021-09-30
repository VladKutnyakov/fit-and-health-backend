import { Request, Response } from "express"
import { getManager } from "typeorm"
import { UsersProfiles } from "../db/entities/UsersProfiles"

// http://localhost:3031/api/auth/login/
const getProfileInfo = async (req: Request, res: Response): Promise<Response> => {

  try {
    const targetUserId = req.params.profileId
    // console.log(targetUserId, req.body.userId)

    if (req.body.userId == targetUserId) {
      // Данные об авторизованном пользователе
      const entityManager = getManager()

      const Profile = await entityManager.findOne(
        UsersProfiles,
        {
          where: {
            user: {
              id: 10
            }
          }
        }
      )

      // console.log(Profile)

      return res.status(200).json(Profile)
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
  getProfileInfo
}
