import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import { Exercises } from "../../../db/entities/Exercises"

export const fetchExercisesList = async (req: Request, res: Response): Promise<Response> => {
  try {
    // console.log(req.query.orderBy ? `exercises.${req.query.orderBy}` : 'exercises.title')

    const orderByParams: any = {
      'pinnedForUsers.id': 'ASC',
      // 'exercises.title': 'ASC',
      // 'exercises.muscleGroup': 'ASC',
      // 'exercises.cardio': 'ASC',
      // 'exercises.power': 'ASC',
      // 'exercises.endurance': 'ASC',
      // 'exercises.flexibility': 'ASC',
      // 'exercises.skill': 'ASC',
    }
    orderByParams[req.query.orderBy ? `exercises.${req.query.orderBy}` : 'exercises.title'] = req.query.sortDirection ? req.query.sortDirection : 'ASC'
    // console.log(orderByParams)

    const ExercisesList = await dataSource.getRepository(Exercises)
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
      .where(req.query.userType === 'MY' ? `exercises.user = ${req.body.userId}` : `exercises.user = ${req.body.userId} OR exercises.user IS NULL`)
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
      .orderBy(orderByParams)
      .getMany()
    // console.log(ExercisesList)

    const exercises: Array<any> = []
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

    return res.status(200).json(exercises)
  } catch (error: any) {
    return res.status(500).json({
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
