import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import { ProductCategories } from '../../../db/entities/ProductCategories'

export const fetchProductCategories = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ProductCategoriesList = await dataSource.getRepository(ProductCategories)
      .createQueryBuilder('categories')
      .select(['categories.id', 'categories.title'])
      .orderBy({'id': 'ASC'})
      .getMany()

    return res.status(200).json(ProductCategoriesList)
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
