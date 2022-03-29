import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import { Products } from "../../../db/entities/Products"

export const removeProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    await dataSource
    .createQueryBuilder()
    .softDelete()
    .from(Products)
    .where(`id = ${req.params.productId}`)
    .execute()

    const response = {
      data: {
        removed: true,
        productId: req.params.productId
      }
    }

    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
