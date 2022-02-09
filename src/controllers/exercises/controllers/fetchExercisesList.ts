import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { Exercises } from "../../../db/entities/Exercises"

export const fetchExercisesList = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ExercisesList = await getRepository(Exercises)
      .createQueryBuilder('exercises')
      .select([
        'exercises.id',
        'exercises.title',
        'exercises.techniqueDescription',
        'exercises.power',
        'exercises.endurance',
        'exercises.flexibility',
        'exercises.cardio',
      ])
      .leftJoinAndSelect('exercises.muscleGroup', 'muscleGroup')
      .leftJoinAndSelect('exercises.additionalMuscles', 'additionalMuscles')
      .leftJoinAndSelect('exercises.type', 'type')
      .leftJoinAndSelect('exercises.sort', 'sort')
      .leftJoinAndSelect('exercises.exertion', 'exertion')
      .leftJoinAndSelect('exercises.equipment', 'equipment')
      .leftJoinAndSelect('exercises.skill', 'skill')
      .leftJoin('exercises.favoriteForUsers', 'favoriteForUsers', `${'favoriteForUsers.id'} = ${req.body.userId}`)
      .addSelect(['favoriteForUsers.id'])
      .leftJoin('exercises.pinnedForUsers', 'pinnedForUsers', `${'pinnedForUsers.id'} = ${req.body.userId}`)
      .addSelect(['pinnedForUsers.id'])
      .leftJoin('exercises.user', 'user')
      .addSelect(['user.id'])
      .orderBy({'exercises.id': 'ASC'})
      .getMany()
    // console.log(ExercisesList)

    const response = {
      updatedToken: req.body.updatedToken,
      data: ExercisesList
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      updatedToken: req.body.updatedToken,
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
