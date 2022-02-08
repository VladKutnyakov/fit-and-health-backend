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

export const updateExercise = async (req: Request, res: Response): Promise<Response> => {
  try {
    const UpdatedExercise = await getRepository(Exercises)
    .createQueryBuilder('exercises')
    .update(Exercises)
    .set({
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
    })
    .where(`id = ${req.body.exercise.id}`)
    .execute()
    // console.log(UpdatedExercise)

    // Узнать есть ли упражнение в избранном и закрепленном у пользователя
    const Exercise = await getRepository(Exercises)
      .createQueryBuilder('exercises')
      .select('exercises.id')
      .where([{id: req.body.exercise.id}])
      .leftJoin('exercises.favoriteForUsers', 'favoriteForUsers', `${'favoriteForUsers.id'} = ${req.body.userId}`)
      .addSelect(['favoriteForUsers.id'])
      .leftJoin('exercises.pinnedForUsers', 'pinnedForUsers', `${'pinnedForUsers.id'} = ${req.body.userId}`)
      .addSelect(['pinnedForUsers.id'])
      .getOne()

    // console.log(Exercise?.favoriteForUsers.length)
    // console.log(Exercise?.pinnedForUsers.length)

    if (Exercise?.favoriteForUsers && Exercise?.favoriteForUsers.length === 0 && req.body.exercise.favorite) {
      await getConnection()
      .createQueryBuilder()
      .relation(Users, "favoriteExercises")
      .of(req.body.userId)
      .add(req.body.exercise.id)
    } else if (Exercise?.favoriteForUsers && Exercise?.favoriteForUsers.length > 0 && !req.body.exercise.favorite) {
      await getConnection()
      .createQueryBuilder()
      .relation(Users, "favoriteExercises")
      .of(req.body.userId)
      .remove(req.body.exercise.id)
    }

    if (Exercise?.pinnedForUsers && Exercise?.pinnedForUsers.length === 0 && req.body.exercise.pinned) {
      await getConnection()
      .createQueryBuilder()
      .relation(Users, "pinnedExercises")
      .of(req.body.userId)
      .add(req.body.exercise.id)
    } else if (Exercise?.pinnedForUsers && Exercise?.pinnedForUsers.length > 0 && !req.body.exercise.pinned) {
      await getConnection()
      .createQueryBuilder()
      .relation(Users, "pinnedExercises")
      .of(req.body.userId)
      .remove(req.body.exercise.id)
    }

    const response = {
      updatedToken: req.body.updatedToken,
      data: {
        exercise: req.body.exercise
      }
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      updatedToken: req.body.updatedToken,
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
