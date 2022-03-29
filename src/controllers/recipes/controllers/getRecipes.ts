import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import { Recipes } from "../../../db/entities/Recipes"

export const getRecipes = async (req: Request, res: Response): Promise<Response> => {
  try {
    const RecipesList = await dataSource.getRepository(Recipes)
      .createQueryBuilder('recipes')
      .where([{user: req.body.userId}, {user: null}])
      .leftJoin("recipes.recipeProducts", "recipeProducts")
      .addSelect(['recipeProducts.weightInRecipe', 'recipeProducts.product'])
      .leftJoin('recipeProducts.product', 'product')
      .addSelect(['product.id', 'product.title', 'product.weight', 'product.protein', 'product.fats', 'product.carb', 'product.kkal'])
      .leftJoin("recipes.user", "user")
      .addSelect(['user.id'])
      .offset(0)
      .limit(10)
      .orderBy({'recipes.id': 'ASC'})
      .getMany()
    // console.log(RecipesList)

    const response = {
      data: RecipesList
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
