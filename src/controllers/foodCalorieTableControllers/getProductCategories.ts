import { Request, Response } from "express"
import { getRepository, getConnection } from "typeorm"
import { Products } from "../../db/entities/Products"
import { ProductCategories } from '../../db/entities/ProductCategories'
import { Users } from '../../db/entities/Users'

export const getProductCategories = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ProductCategoriesList = await getRepository(ProductCategories)
      .createQueryBuilder('categories')
      .orderBy({'id': 'ASC'})
      .getMany()

    const response = {
      updatedToken: req.body.updatedToken,
      data: ProductCategoriesList
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      updatedToken: req.body.updatedToken,
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
