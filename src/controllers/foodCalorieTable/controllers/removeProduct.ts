import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import { Products } from "../../../db/entities/Products"

export const removeProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Обработка ошибки - не передан id продукта
    if (!req.params.productId) {
      return res.status(400).json({
        errors: [
          {
            field: null,
            errorMessage: 'Не переданн id продукта.'
          }
        ]
      })
    }

    if (req.body.userId) {
      await dataSource
        .createQueryBuilder()
        .softDelete()
        .from(Products)
        .where(`id = ${req.params.productId} AND userId = ${req.body.userId}`)
        .execute()

      return res.status(200).json({
        removed: true,
        productId: req.params.productId
      })
    } else {
      return res.status(404).json({
        errors: [
          {
            field: null,
            errorMessage: 'Пользователь не найден. Зарегистрируйтесь или авторизуйтесь, чтобы удалять продукты.'
          }
        ]
      })
    }
  } catch (error) {
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
