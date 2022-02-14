import { Request, Response } from "express"
import { getRepository, getConnection } from "typeorm"
import { Users } from '../../../db/entities/Users'
import { Skills } from '../../../db/entities/Skills'
import { Muscles } from "../../../db/entities/Muscles"
import { Exercises } from "../../../db/entities/Exercises"
import { ExerciseTypes } from "../../../db/entities/ExerciseTypes"
import { ExerciseSorts } from "../../../db/entities/ExerciseSorts"
import { ExerciseExertions } from "../../../db/entities/ExerciseExertions"
import { ExerciseEquipments } from "../../../db/entities/ExerciseEquipments"

export const saveNewExercise = async (req: Request, res: Response): Promise<Response> => {
  try {
    const CreatedExercise = await getRepository(Exercises)
    .createQueryBuilder('exercises')
    .insert()
    .into(Exercises)
    .values([{
      title: req.body.exercise.title,
      techniqueDescription: req.body.exercise.techniqueDescription,
      type: getRepository(ExerciseTypes).create({
        id: req.body.exercise.type?.id,
      }),
      sort: getRepository(ExerciseSorts).create({
        id: req.body.exercise.sort?.id,
      }),
      equipment: getRepository(ExerciseEquipments).create({
        id: req.body.exercise.equipment?.id,
      }),
      exertion: getRepository(ExerciseExertions).create({
        id: req.body.exercise.exertion?.id,
      }),
      skill: getRepository(Skills).create({
        id: req.body.exercise.skill?.id,
      }),
      muscleGroup: getRepository(Muscles).create({
        id: req.body.exercise.muscleGroup?.id,
      }),
      // additionalMuscles: [
      //   {
      //     "id": 0,
      //     "title": "string"
      //   }
      // ],
      power: req.body.exercise.power,
      endurance: req.body.exercise.endurance,
      flexibility: req.body.exercise.flexibility,
      cardio: req.body.exercise.cardio,
      user: getRepository(Users).create({
        id: req.body.userId,
      })
    }])
    .execute()
    // console.log(CreatedExercise)

    if (req.body.exercise.favorite) {
      await getConnection()
      .createQueryBuilder()
      .relation(Users, "favoriteExercises")
      .of(req.body.userId)
      .add(CreatedExercise.raw[0].id)
    }

    if (req.body.exercise.pinned) {
      await getConnection()
      .createQueryBuilder()
      .relation(Users, "pinnedExercises")
      .of(req.body.userId)
      .add(CreatedExercise.raw[0].id)
    }

    const response = {
      data: {
        id: CreatedExercise.raw[0].id,
        title: req.body.exercise.title,
        techniqueDescription: req.body.exercise.techniqueDescription,
        type: req.body.exercise.type,
        sort: req.body.exercise.sort,
        equipment: req.body.exercise.equipment,
        exertion: req.body.exercise.exertion,
        skill: req.body.exercise.skill,
        muscleGroup: req.body.exercise.muscleGroup,
        additionalMuscles: [],
        power: req.body.exercise.power,
        endurance: req.body.exercise.endurance,
        flexibility: req.body.exercise.flexibility,
        cardio: req.body.exercise.cardio,
        user: { id: req.body.userId }
      }
    }
    // console.log(response)

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
