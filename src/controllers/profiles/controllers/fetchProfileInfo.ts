import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import { UsersProfiles } from "../../../db/entities/UsersProfiles"

export const fetchProfileInfo = async (req: Request, res: Response): Promise<Response> => {
  try {
    if (req.params.profileId !== '') {
      // console.log('НЕавторизованный пользователь', req.params.profileId)

      // Данные о НЕ авторизованном пользователе
      const Profile = await dataSource.manager.findOne(
        UsersProfiles,
        {
          where: {
            user: {
              id: req.body.profileId
            }
          }
        }
      )

      return res.status(200).json(Profile)
    } else {
      // console.log('авторизованный пользователь', req.body.userId)

      // Данные об авторизованном пользователе
      const Profile = await dataSource.manager.findOne(
        UsersProfiles,
        {
          where: {
            user: {
              id: req.body.userId || null
            }
          }
        }
      )

      return res.status(200).json(Profile)
    }
  } catch (error: any) {
    return res.status(500).json({
      message: 'Неизвестная ошибка.'
    })
  }

}
