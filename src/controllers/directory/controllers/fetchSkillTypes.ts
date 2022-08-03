import { Request, Response } from "express"
import { dataSource } from '@/dataSource'
import { Skills } from "@/db/entities/Skills"

export const fetchSkillTypes = async (req: Request, res: Response): Promise<Response> => {
  try {
    const SkillTypesList = await dataSource.getRepository(Skills)
      .createQueryBuilder('skills')
      .orderBy('id')
      .getMany()
    // console.log(SkillTypesList)

    return res.status(200).json(SkillTypesList)
  } catch (error: any) {
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
