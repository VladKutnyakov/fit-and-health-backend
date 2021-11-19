import { Request, Response } from "express"
import { getManager } from "typeorm"
import { UsersProfiles } from "../db/entities/UsersProfiles"

const getProfilesList = async (req: Request, res: Response): Promise<Response> => {
  try {

    const response = {
      updatedToken: req.body.updatedToken,
      data: null
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      updatedToken: req.body.updatedToken,
      errorMessage: 'Неизвестная ошибка.'
    })
  }

}

const getProfileInfo = async (req: Request, res: Response): Promise<Response> => {
  try {
    if (req.params.profileId !== 'undefined') {
      // console.log('НЕавторизованный пользователь', req.params.profileId)

      // Данные о НЕ авторизованном пользователе
      const entityManager = getManager()

      const Profile = await entityManager.findOne(
        UsersProfiles,
        {
          where: {
            user: {
              id: req.params.profileId
            }
          }
        }
      )

      // console.log(Profile)

      const response = {
        updatedToken: req.body.updatedToken,
        data: Profile
      }
  
      return res.status(200).json(response)
    } else {
      // console.log('авторизованный пользователь', req.body.userId)

      // Данные об авторизованном пользователе
      const entityManager = getManager()

      const Profile = await entityManager.findOne(
        UsersProfiles,
        {
          where: {
            user: {
              id: req.body.userId
            }
          }
        }
      )

      // console.log(Profile)

      const response = {
        updatedToken: req.body.updatedToken,
        data: Profile
      }
  
      return res.status(200).json(response)
    }
  } catch (error: any) {
    return res.status(500).json({
      message: 'Неизвестная ошибка.'
    })
  }

}

export default {
  getProfilesList,
  getProfileInfo
}
