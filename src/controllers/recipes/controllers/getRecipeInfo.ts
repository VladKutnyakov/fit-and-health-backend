import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { Recipes } from "../../../db/entities/Recipes"

export const getRecipeInfo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const RecipeInfo = await getRepository(Recipes)
      .createQueryBuilder('recipe')
      .select([
        'recipe.id',
        'recipe.title',
        'recipe.description',
        'recipe.cookingTimes',
        'recipe.cookingSkill'
      ])
      .where([{id: req.params.recipeId}])
      .leftJoin("recipe.recipeProducts", "recipeProducts")
      .addSelect(['recipeProducts.weightInRecipe', 'recipeProducts.product'])
      .leftJoin('recipeProducts.product', 'product')
      .addSelect(['product.id', 'product.title', 'product.weight', 'product.protein', 'product.fats', 'product.carb', 'product.kkal'])
      .leftJoinAndSelect('recipe.recipeSteps', 'recipeSteps')
      .leftJoinAndSelect('recipe.marks', 'marks')
      .leftJoin("recipe.user", "user")
      .addSelect(['user.id'])
      .getOne()
    // console.log(RecipeInfo)

    const response = {
      data: RecipeInfo
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
