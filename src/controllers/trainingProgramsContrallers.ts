import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { TrainingPrograms } from "../db/entities/TrainingPrograms"

const getTrainingPrograms = async (req: Request, res: Response): Promise<Response> => {
  try {
    // const RecipesList = await getRepository(Recipes)
    //   .createQueryBuilder('recipes')
    //   .where([{user: req.body.userId}, {user: null}])
    //   .leftJoin("recipes.recipeProducts", "recipeProducts")
    //   .addSelect(['recipeProducts.weightInRecipe', 'recipeProducts.product'])
    //   .leftJoin('recipeProducts.product', 'product')
    //   .addSelect(['product.id', 'product.title', 'product.weight', 'product.protein', 'product.fats', 'product.carb', 'product.kkal'])
    //   .leftJoin("recipes.user", "user")
    //   .addSelect(['user.id'])
    //   .offset(0)
    //   .limit(10)
    //   .orderBy({'recipes.id': 'ASC'})
    //   .getMany()
    // console.log(RecipesList)

    const response = {
      updatedToken: req.body.updatedToken,
      data: null
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      updatedToken: req.body.updatedToken,
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}

const getTrainingProgramInfo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const TrainingProgramInfo = await getRepository(TrainingPrograms)
      .createQueryBuilder('trainingProgram')
      .where([{id: req.params.trainingProgramId}])
      .leftJoinAndSelect("trainingProgram.trainingProgramDays", "trainingProgramDays")
      .leftJoinAndSelect('trainingProgram.marks', 'marks')
      .leftJoin("trainingProgram.user", "user")
      .addSelect(['user.id'])
      .getOne()
    console.log(TrainingProgramInfo)

    const response = {
      updatedToken: req.body.updatedToken,
      data: TrainingProgramInfo
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
  getTrainingPrograms,
  getTrainingProgramInfo
}
