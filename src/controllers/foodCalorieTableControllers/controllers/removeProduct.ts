import { Request, Response } from "express"
import { getRepository, getConnection } from "typeorm"
import { Products } from "../../../db/entities/Products"
import { ProductCategories } from '../../../db/entities/ProductCategories'
import { Users } from '../../../db/entities/Users'

export const removeProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    await getConnection()
    .createQueryBuilder()
    .softDelete()
    .from(Products)
    .where(`id = ${req.params.productId}`)
    .execute()

    const response = {
      updatedToken: req.body.updatedToken,
      data: {
        removed: true,
        productId: req.params.productId
      }
    }

    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({
      updatedToken: req.body.updatedToken,
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
