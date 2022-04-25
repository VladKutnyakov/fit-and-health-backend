import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import { Exercises } from "../../../db/entities/Exercises"

export const fetchExerciseInfo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ExercisesInfo = await dataSource.getRepository(Exercises)
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
      .where([{id: req.params.exerciseId}])
      .leftJoinAndSelect('exercises.trainingPlace', 'trainingPlace')
      .leftJoinAndSelect('exercises.muscleGroup', 'muscles')
      .leftJoinAndSelect('exercises.type', 'type')
      .leftJoinAndSelect('exercises.sort', 'sort')
      .leftJoinAndSelect('exercises.exertion', 'exertion')
      .leftJoinAndSelect('exercises.equipment', 'equipment')
      .leftJoinAndSelect('exercises.skill', 'skill')
      .leftJoinAndSelect('exercises.additionalMuscles', 'additionalMuscles')
      .leftJoin('exercises.favoriteForUsers', 'favoriteForUsers', `${'favoriteForUsers.id'} = ${req.body.userId}`)
      .addSelect(['favoriteForUsers.id'])
      .leftJoin('exercises.pinnedForUsers', 'pinnedForUsers', `${'pinnedForUsers.id'} = ${req.body.userId}`)
      .addSelect(['pinnedForUsers.id'])
      .leftJoin("exercises.user", "user")
      .addSelect(['user.id'])
      .getOne()
      // .getSql()
    // console.log(ExercisesInfo)

    let exercise: any = null
    
    if (ExercisesInfo) {
      exercise = {
        id: ExercisesInfo?.id,
        title: ExercisesInfo?.title,
        techniqueDescription: ExercisesInfo?.techniqueDescription,
        trainingPlace: ExercisesInfo?.trainingPlace,
        type: ExercisesInfo?.type,
        sort: ExercisesInfo?.sort,
        exertion: ExercisesInfo?.exertion,
        equipment: ExercisesInfo?.equipment,
        skill: ExercisesInfo?.skill ? {id: ExercisesInfo.skill.id, title: ExercisesInfo.skill.complexityTitle} : null,
        muscleGroup: ExercisesInfo?.muscleGroup,
        additionalMuscles: ExercisesInfo?.additionalMuscles,
        power: ExercisesInfo?.power,
        endurance: ExercisesInfo?.endurance,
        flexibility: ExercisesInfo?.flexibility,
        cardio: ExercisesInfo?.cardio,
        favorite: ExercisesInfo.favoriteForUsers.length > 0 ? true : false,
        pinned: ExercisesInfo.pinnedForUsers.length > 0 ? true : false,
        user: ExercisesInfo?.user
      }
    }

    return res.status(200).json(exercise)
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
