import { Request, Response } from 'express'
import { dataSource } from '../../../dataSource'
import { UsersSettings } from "../../../db/entities/UsersSettings"

export const setAppTheme = async (req: Request, res: Response): Promise<Response> => {
  try {
    if (req.body.browserTheme && (req.body.browserTheme === 'DARK' || req.body.browserTheme === 'LIGHT')) {
      // Установить тему для браузера
      const UpdatedBrowserTheme = await dataSource.getRepository(UsersSettings)
        .createQueryBuilder('usersSettings')
        .update(UsersSettings)
        .set({
          browserTheme: req.body.browserTheme,
        })
        .where(`userId = ${req.body.userId}`)
        .execute()
      // console.log(UpdatedBrowserTheme)

      const response = {
        browserTheme: req.body.browserTheme,
        mobileAppTheme: null
      }

      return res.status(200).json(response)
    }

    if (req.body.mobileAppTheme && (req.body.mobileAppTheme === 'DARK' || req.body.mobileAppTheme === 'LIGHT')) {
      // Установить тему для мобильного приложения
      const UpdatedMobileAppTheme = await dataSource.getRepository(UsersSettings)
        .createQueryBuilder('usersSettings')
        .update(UsersSettings)
        .set({
          mobileAppTheme: req.body.mobileAppTheme,
        })
        .where(`userId = ${req.body.userId}`)
        .execute()
      // console.log(UpdatedMobileAppTheme)

      const response = {
        browserTheme: req.body.mobileAppTheme,
        mobileAppTheme: null
      }

      return res.status(200).json(response)
    }

    return res.status(400)
  } catch (erro: any) {
    return res.status(500).json({
      errors: [
        {
          field: null,
          errorMessage: 'Неизвестная ошибка.'
        }
      ]
    })
  }

}
