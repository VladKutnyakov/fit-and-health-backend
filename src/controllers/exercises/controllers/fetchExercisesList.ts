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

    const exercises = []
    for (let i = 0; i < ExercisesList.length; i++) {
      exercises.push({
        id: ExercisesList[i].id,
        title: ExercisesList[i].title,
        techniqueDescription: ExercisesList[i].techniqueDescription,
        power: ExercisesList[i].power,
        endurance: ExercisesList[i].endurance,
        flexibility: ExercisesList[i].flexibility,
        cardio: ExercisesList[i].cardio,
        type: ExercisesList[i].type,
        sort: ExercisesList[i].sort,
        exertion: ExercisesList[i].exertion,
        equipment: ExercisesList[i].equipment,
        skill: ExercisesList[i].skill,
        muscleGroup: ExercisesList[i].muscleGroup,
        additionalMuscles: ExercisesList[i].additionalMuscles,
        user: ExercisesList[i].user,
        favorite: ExercisesList[i].favoriteForUsers.length > 0 ? true : false,
        pinned: ExercisesList[i].pinnedForUsers.length > 0 ? true : false,
      })
    }
    // console.log(exercises)

    const response = {
      data: exercises
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
