import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { UsersProfiles } from "../../../db/entities/UsersProfiles"

export const getProfilesList = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ProfilesList = await getRepository(UsersProfiles)
      .createQueryBuilder('usersProfiles')
      .leftJoin("usersProfiles.user", "user")
      .addSelect(['user.id'])
      .orderBy({'usersProfiles.id': 'ASC'})
      .getMany()
    console.log(ProfilesList)

    const response = {
      updatedToken: req.body.updatedToken,
      data: ProfilesList
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      updatedToken: req.body.updatedToken,
      errorMessage: 'Неизвестная ошибка.'
    })
  }

}
