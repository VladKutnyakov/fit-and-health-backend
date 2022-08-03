import { Request, Response } from "express"
import { dataSource } from '@/dataSource'
import { Users } from '@/db/entities/Users'
import { TrainingPlaces } from '@/db/entities/TrainingPlaces'
import { Skills } from '@/db/entities/Skills'
import { Muscles } from "@/db/entities/Muscles"
import { Exercises } from "@/db/entities/Exercises"
import { ExerciseTypes } from "@/db/entities/ExerciseTypes"
import { ExerciseSorts } from "@/db/entities/ExerciseSorts"
import { ExerciseExertions } from "@/db/entities/ExerciseExertions"
import { ExerciseEquipments } from "@/db/entities/ExerciseEquipments"

export const updateExercise = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Обработка ошибки - не найден пользователь
    if (!req.body.userId) {
      return res.status(404).json({
        errors: [
          {
            field: null,
            errorMessage: 'Пользователь не найден. Зарегистрируйтесь или авторизуйтесь, чтобы редактировать закрепленные продукты.'
          }
        ]
      })
    }

    // Обработка ошибки - не передан объект с данными об упражнении
    if (!req.body.exercise) {
      return res.status(400).json({
        errors: [
          {
            field: null,
            errorMessage: 'Не переданные данные об упражнении.'
          }
        ]
      })
    }

    // Обработка ошибки - не указано обязательное поле в передаваемых данных
    if (!req.body.exercise.title) {
      return res.status(400).json({
        errors: [
          {
            field: 'title',
            errorMessage: 'Не указано название.'
          }
        ]
      })
    }

    // ТРАНЗАКЦИЯ
    const queryRunner = dataSource.createQueryRunner()
    await queryRunner.connect()

    await queryRunner.startTransaction()

    try {
      // Обновление упражнения в БД
      const UpdatedExercise = await queryRunner.manager.getRepository(Exercises)
        .createQueryBuilder('exercises')
        .update(Exercises)
        .set({
          title: req.body.exercise.title,
          techniqueDescription: req.body.exercise.techniqueDescription,
          trainingPlace: req.body.exercise.trainingPlace ? dataSource.getRepository(TrainingPlaces).create({
            id: req.body.exercise.trainingPlace?.id,
          }) : null,
          type: req.body.exercise.type ? dataSource.getRepository(ExerciseTypes).create({
            id: req.body.exercise.type?.id,
          }) : null,
          sort: req.body.exercise.sort ? dataSource.getRepository(ExerciseSorts).create({
            id: req.body.exercise.sort?.id,
          }) : null,
          equipment: req.body.exercise.equipment ? dataSource.getRepository(ExerciseEquipments).create({
            id: req.body.exercise.equipment?.id,
          }) : null,
          exertion: req.body.exercise.exertion ? dataSource.getRepository(ExerciseExertions).create({
            id: req.body.exercise.exertion?.id,
          }) : null,
          skill: req.body.exercise.skill ? dataSource.getRepository(Skills).create({
            id: req.body.exercise.skill?.id,
          }) : null,
          muscleGroup: req.body.exercise.muscleGroup ? dataSource.getRepository(Muscles).create({
            id: req.body.exercise.muscleGroup?.id,
          }) : null,
          power: req.body.exercise.power || null,
          endurance: req.body.exercise.endurance || null,
          flexibility: req.body.exercise.flexibility || null,
          cardio: req.body.exercise.cardio || null,
        })
        .where(`id = ${req.body.exercise.id}`)
        .execute()
      // console.log(UpdatedExercise)

      // Узнать есть ли упражнение в избранном и закрепленном у пользователя
      const Exercise = await queryRunner.manager.getRepository(Exercises)
        .createQueryBuilder('exercises')
        .select('exercises.id')
        .where([{id: req.body.exercise.id}])
        .leftJoinAndSelect('exercises.additionalMuscles', 'additionalMuscles')
        .leftJoin('exercises.favoriteForUsers', 'favoriteForUsers', `${'favoriteForUsers.id'} = ${req.body.userId}`)
        .addSelect(['favoriteForUsers.id'])
        .leftJoin('exercises.pinnedForUsers', 'pinnedForUsers', `${'pinnedForUsers.id'} = ${req.body.userId}`)
        .addSelect(['pinnedForUsers.id'])
        .getOne()

      // console.log(Exercise?.additionalMuscles.length)
      // console.log(Exercise?.favoriteForUsers.length)
      // console.log(Exercise?.pinnedForUsers.length)

      if (Exercise && req.body.exercise.additionalMuscles) {
        const oldAdditionalMusclesIds: Array<number> = Exercise?.additionalMuscles.map((item: any) => item.id)

        const newAdditionalMusclesIds: Array<number> = req.body.exercise.additionalMuscles.map((item: any) => item.id)

        await queryRunner.manager
          .createQueryBuilder()
          .relation(Exercises, "additionalMuscles")
          .of(Exercise.id)
          .remove(oldAdditionalMusclesIds)

        await queryRunner.manager
          .createQueryBuilder()
          .relation(Exercises, "additionalMuscles")
          .of(Exercise.id)
          .add(newAdditionalMusclesIds)
      }

      if (Exercise?.favoriteForUsers && Exercise?.favoriteForUsers.length === 0 && req.body.exercise.favorite) {
        await queryRunner.manager
          .createQueryBuilder()
          .relation(Users, "favoriteExercises")
          .of(req.body.userId)
          .add(req.body.exercise.id)
      } else if (Exercise?.favoriteForUsers && Exercise?.favoriteForUsers.length > 0 && !req.body.exercise.favorite) {
        await queryRunner.manager
          .createQueryBuilder()
          .relation(Users, "favoriteExercises")
          .of(req.body.userId)
          .remove(req.body.exercise.id)
      }

      if (Exercise?.pinnedForUsers && Exercise?.pinnedForUsers.length === 0 && req.body.exercise.pinned) {
        await queryRunner.manager
          .createQueryBuilder()
          .relation(Users, "pinnedExercises")
          .of(req.body.userId)
          .add(req.body.exercise.id)
      } else if (Exercise?.pinnedForUsers && Exercise?.pinnedForUsers.length > 0 && !req.body.exercise.pinned) {
        await queryRunner.manager
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

      await queryRunner.commitTransaction()

      return res.status(200).json(response)
    } catch (error) {
      await queryRunner.rollbackTransaction()

      return res.status(400).json({
        errors: [
          {
            field: null,
            errorMessage: 'Ошибка при сохранении.'
          }
        ]
      })
    } finally {
      await queryRunner.release()
    }
  } catch (error: any) {
    return res.status(500).json({
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
