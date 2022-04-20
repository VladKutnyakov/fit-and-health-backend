import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import { Muscles } from "../../../db/entities/Muscles"

export const fetchExercisesListByMuscles = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ExercisesList = await dataSource.getRepository(Muscles)
      .createQueryBuilder('muscles')
      .leftJoin('muscles.exercises', 'exercises', `exercises.user = ${req.body.userId} OR exercises.user IS NULL`)
      .addSelect(['exercises.id', 'exercises.title'])
      .leftJoinAndSelect('exercises.additionalMuscles', 'additionalMuscles')
      .leftJoin('exercises.favoriteForUsers', 'favoriteForUsers', `${'favoriteForUsers.id'} = ${req.body.userId}`)
      .addSelect(['favoriteForUsers.id'])
      .leftJoin('exercises.pinnedForUsers', 'pinnedForUsers', `${'pinnedForUsers.id'} = ${req.body.userId}`)
      .addSelect(['pinnedForUsers.id'])
      .leftJoin("exercises.user", "user")
      .addSelect(['user.id'])
      .orderBy({'muscles.id': 'ASC'})
      .getMany()
      // .getSql()
    // console.log(ExercisesList)

    const AllExersicesByMuscles: any = []

    for (let i = 0; i < ExercisesList.length; i++) {
      const list: any = []

      ExercisesList[i].exercises.forEach((element: any) => {
        const item = {
          id: element.id,
          title: element.title,
          additionalMuscles: [],
          favorite: element.favoriteForUsers.length > 0 ? true : false,
          pinned: element.pinnedForUsers.length > 0 ? true : false,
          user: element.user
        }

        list.push(item)
      })

      const ExercisesByMuscle = {
        id: ExercisesList[i].id,
        title: ExercisesList[i].title,
        exercises: list
      }
      AllExersicesByMuscles.push(ExercisesByMuscle)
    }
    // console.log(AllExersicesByMuscles[0])

    return res.status(200).json(AllExersicesByMuscles)
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
