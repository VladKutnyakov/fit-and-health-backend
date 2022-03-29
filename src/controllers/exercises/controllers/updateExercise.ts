import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
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
    const UpdatedExercise = await dataSource.getRepository(Exercises)
    .createQueryBuilder('exercises')
    .update(Exercises)
    .set({
      title: req.body.exercise.title,
      techniqueDescription: req.body.exercise.techniqueDescription,
      type: dataSource.getRepository(ExerciseTypes).create({
        id: req.body.exercise.type?.id,
      }),
      sort: dataSource.getRepository(ExerciseSorts).create({
        id: req.body.exercise.sort?.id,
      }),
      equipment: dataSource.getRepository(ExerciseEquipments).create({
        id: req.body.exercise.equipment?.id,
      }),
      exertion: dataSource.getRepository(ExerciseExertions).create({
        id: req.body.exercise.exertion?.id,
      }),
      skill: dataSource.getRepository(Skills).create({
        id: req.body.exercise.skill?.id,
      }),
      muscleGroup: dataSource.getRepository(Muscles).create({
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
    const Exercise = await dataSource.getRepository(Exercises)
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
      await dataSource
      .createQueryBuilder()
      .relation(Users, "favoriteExercises")
      .of(req.body.userId)
      .add(req.body.exercise.id)
    } else if (Exercise?.favoriteForUsers && Exercise?.favoriteForUsers.length > 0 && !req.body.exercise.favorite) {
      await dataSource
      .createQueryBuilder()
      .relation(Users, "favoriteExercises")
      .of(req.body.userId)
      .remove(req.body.exercise.id)
    }

    if (Exercise?.pinnedForUsers && Exercise?.pinnedForUsers.length === 0 && req.body.exercise.pinned) {
      await dataSource
      .createQueryBuilder()
      .relation(Users, "pinnedExercises")
      .of(req.body.userId)
      .add(req.body.exercise.id)
    } else if (Exercise?.pinnedForUsers && Exercise?.pinnedForUsers.length > 0 && !req.body.exercise.pinned) {
      await dataSource
      .createQueryBuilder()
      .relation(Users, "pinnedExercises")
      .of(req.body.userId)
      .remove(req.body.exercise.id)
    }

    const response = {
      data: {
        exercise: req.body.exercise
      }
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
