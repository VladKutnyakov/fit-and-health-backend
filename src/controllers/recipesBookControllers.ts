import { Request, Response } from "express"
import { getManager } from "typeorm"
// import { Products } from "../db/entities/Products"

const getRecipes = async (req: Request, res: Response): Promise<Response> => {
  try {
    console.log(req.body, req.params)

    // const RecipesList = await getManager().find(
    //   Recipes,
    //   {
    //     where: [
    //       { user: req.body.userId },
    //       { user: null }
    //     ],
    //     relations: ['user', 'category']
    //   }
    // )

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

export default {
  getRecipes
}
