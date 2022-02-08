import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { Skills } from "../../../db/entities/Skills"

export const fetchSkillTypes = async (req: Request, res: Response): Promise<Response> => {
  try {
    const SkillTypesList = await getRepository(Skills)
      .createQueryBuilder('skills')
      .orderBy('id')
      .getMany()
    // console.log(SkillTypesList)

    const response = {
      updatedToken: req.body.updatedToken,
      data: SkillTypesList
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      updatedToken: req.body.updatedToken,
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
