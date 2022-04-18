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
        'exercises.previewImage',
        'exercises.power',
        'exercises.endurance',
        'exercises.flexibility',
        'exercises.cardio',
      ])
      .where(`exercises.title LIKE '%${req.query?.searchString || ''}%'`)
      .andWhere(req.query.muscleGroup ? `exercises.muscleGroup IN (${req.query.muscleGroup})` : `exercises.muscleGroup IS NOT NULL`)
      .andWhere(req.query.userType === 'MY' ? `exercises.user = ${req.body.userId}` : `(exercises.user = ${req.body.userId} OR exercises.user IS NULL)`)
      .andWhere(!req.query.mediaType || req.query.mediaType === 'ALL' ? `exercises.previewImage IS NOT NULL OR exercises.previewImage IS NULL` : `exercises.previewImage IS NOT NULL`)
      .andWhere(!req.query.trainingPlace || req.query.trainingPlace === 'ALL' ? `(exercises.trainingPlace IS NOT NULL OR exercises.trainingPlace IS NULL)` : `exercises.trainingPlace = '${req.query.trainingPlace}'`)
      .leftJoinAndSelect('exercises.muscleGroup', 'muscleGroup')
      .leftJoinAndSelect('exercises.additionalMuscles', 'additionalMuscles')
      .leftJoinAndSelect('exercises.type', 'type')
      .leftJoinAndSelect('exercises.trainingPlace', 'trainingPlace')
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
    //   .getSql()
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
        trainingPlace: ExercisesList[i].trainingPlace,
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
