import { Request, Response } from "express"
import { dataSource } from '@/dataSource'
import { Products } from "@/db/entities/Products"
import { ProductCategories } from '@/db/entities/ProductCategories'
import { Users } from '@/db/entities/Users'

export const updateProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Обработка ошибки - не передан объект с данными о продукте
    if (!req.body.product) {
      return res.status(400).json({
        errors: [
          {
            field: null,
            errorMessage: 'Не переданные данные о продукте.'
          }
        ]
      })
    }

    // Обработка ошибки - не указано обязательное поле в передаваемых данных
    const errors = []

    for (const key in req.body.product) {
      if (
        (key !== 'id' && !req.body.product[key]) &&
        (key !== 'pinned' && !req.body.product[key]) &&
        (key !== 'favorite' && !req.body.product[key])
      ) {
        errors.push({
          field: key,
          errorMessage: 'Обязательно для заполнения.'
        })
      }
    }

    if (errors.length) {
      return res.status(400).json({
        errors: errors
      })
    }

    if (req.body.userId) {
      // Обновить основные данные о продукте
      const UpdatedProduct = await dataSource.getRepository(Products)
        .createQueryBuilder('products')
        .update(Products)
        .set({
            title: req.body.product.title,
            weight: 100,
            protein: req.body.product.protein,
            fats: req.body.product.fats,
            carb: req.body.product.carb,
            kkal: req.body.product.kkal,
            user: dataSource.getRepository(Users).create({
              id: req.body.userId,
            }),
            category: req.body.product.category ? dataSource.getRepository(ProductCategories).create({
              id: req.body.product.category?.id,
            }) : null
          })
        .where(`id = ${req.body.product.id}`)
        .execute()

      // Узнать есть ли продукт в избранном и закрепленном у пользователя
      const Product = await dataSource.getRepository(Products)
        .createQueryBuilder('products')
        .select('products.id')
        .where([{id: req.body.product.id}])
        .leftJoin('products.favoriteForUsers', 'favoriteForUsers', `${'favoriteForUsers.id'} = ${req.body.userId}`)
        .addSelect(['favoriteForUsers.id'])
        .leftJoin('products.pinnedForUsers', 'pinnedForUsers', `${'pinnedForUsers.id'} = ${req.body.userId}`)
        .addSelect(['pinnedForUsers.id'])
        .getOne()

      // console.log(Product?.favoriteForUsers.length)
      // console.log(Product?.pinnedForUsers.length)

      if (Product?.favoriteForUsers && Product?.favoriteForUsers.length === 0 && req.body.product.favorite) {
        await dataSource
        .createQueryBuilder()
        .relation(Users, "favoriteProducts")
        .of(req.body.userId)
        .add(req.body.product.id)
      } else if (Product?.favoriteForUsers && Product?.favoriteForUsers.length > 0 && !req.body.product.favorite) {
        await dataSource
        .createQueryBuilder()
        .relation(Users, "favoriteProducts")
        .of(req.body.userId)
        .remove(req.body.product.id)
      }

      if (Product?.pinnedForUsers && Product?.pinnedForUsers.length === 0 && req.body.product.pinned) {
        await dataSource
        .createQueryBuilder()
        .relation(Users, "pinnedProducts")
        .of(req.body.userId)
        .add(req.body.product.id)
      } else if (Product?.pinnedForUsers && Product?.pinnedForUsers.length > 0 && !req.body.product.pinned) {
        await dataSource
        .createQueryBuilder()
        .relation(Users, "pinnedProducts")
        .of(req.body.userId)
        .remove(req.body.product.id)
      }

      return res.status(200).json(req.body.product)
    } else {
      return res.status(404).json({
        errors: [
          {
            field: null,
            errorMessage: 'Пользователь не найден. Зарегистрируйтесь или авторизуйтесь, чтобы редактировать избранные продукты.'
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
