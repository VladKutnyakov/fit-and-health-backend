import { Request, Response } from 'express'
import { dataSource } from '../../../dataSource'
import { UsersSettings } from "../../../db/entities/UsersSettings"

export const fetchAppTheme = async (req: Request, res: Response): Promise<Response> => {
  try {
    const AppTheme = await dataSource.getRepository(UsersSettings)
      .createQueryBuilder('usersSettings')
      .select([
        'usersSettings.browserTheme',
        'usersSettings.mobileAppTheme',
      ])
      .where(`usersSettings.userId = ${req.body?.userId || null}`)
      .getOne()
    // console.log(AppTheme)

    const response = {
      browserTheme: AppTheme?.browserTheme || null,
      mobileAppTheme: AppTheme?.mobileAppTheme || null,
    }

    return res.status(200).json(response)
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
