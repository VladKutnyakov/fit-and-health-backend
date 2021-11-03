import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { Recipes } from "../db/entities/Recipes"

const getRecipes = async (req: Request, res: Response): Promise<Response> => {
  try {
    // console.log(req.body, req.params)

    const RecipesList = await getRepository(Recipes)
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
      // .getSql()
    // console.log(RecipesList)

    const AllRecipes: any = []

    for (let i = 0; i < RecipesList.length; i++) {
      const item = {
        id: RecipesList[i].id,
        title: RecipesList[i].title,
        description: RecipesList[i].description,
        cookingTimes: RecipesList[i].cookingTimes,
        cookingSkill: RecipesList[i].cookingSkill,
        products: RecipesList[i].recipeProducts,
        user: RecipesList[i]?.user?.id || null,
      }

      AllRecipes.push(item)
    }
    // console.log(AllRecipes)

    const response = {
      updatedToken: req.body.updatedToken,
      data: AllRecipes
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      updatedToken: req.body.updatedToken,
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}

export default {
  getRecipes
}
