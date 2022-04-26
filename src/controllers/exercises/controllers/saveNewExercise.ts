import { Request, Response } from "express"
import { dataSource } from '../../../dataSource'
import { Exercises } from "../../../db/entities/Exercises"
import { ExerciseTypes } from "../../../db/entities/ExerciseTypes"
import { ExerciseSorts } from "../../../db/entities/ExerciseSorts"
import { ExerciseExertions } from "../../../db/entities/ExerciseExertions"
import { ExerciseEquipments } from "../../../db/entities/ExerciseEquipments"
import { Users } from '../../../db/entities/Users'
import { Skills } from '../../../db/entities/Skills'
import { TrainingPlaces } from "../../../db/entities/TrainingPlaces"
import { Muscles } from "../../../db/entities/Muscles"

export const saveNewExercise = async (req: Request, res: Response): Promise<Response> => {
  try {
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
      // Создание упражнения в БД
      const CreatedExercise = await queryRunner.manager.getRepository(Exercises)
      .createQueryBuilder('exercises')
      .insert()
      .into(Exercises)
      .values([{
        title: req.body.exercise.title,
        techniqueDescription: req.body.exercise.techniqueDescription,
        type: dataSource.getRepository(ExerciseTypes).create({
          id: req.body.exercise.type?.id,
        }),
        sort: dataSource.getRepository(ExerciseSorts).create({
          id: req.body.exercise.sort?.id,
        }),
        exertion: dataSource.getRepository(ExerciseExertions).create({
          id: req.body.exercise.exertion?.id,
        }),
        equipment: dataSource.getRepository(ExerciseEquipments).create({
          id: req.body.exercise.equipment?.id,
        }),
        skill: dataSource.getRepository(Skills).create({
          id: req.body.exercise.skill?.id,
        }),
        trainingPlace: dataSource.getRepository(TrainingPlaces).create({
          id: req.body.exercise.trainingPlace?.id,
        }),
        muscleGroup: dataSource.getRepository(Muscles).create({
          id: req.body.exercise.muscleGroup?.id,
        }),
        power: req.body.exercise.power,
        endurance: req.body.exercise.endurance,
        flexibility: req.body.exercise.flexibility,
        cardio: req.body.exercise.cardio,
        user: dataSource.getRepository(Users).create({
          id: req.body.userId,
        })
      }])
      .execute()
      // console.log(CreatedExercise)

      // Добавление дополнительных мышечных групп для упражнения
      if (req.body.exercise.additionalMuscles && req.body.exercise.additionalMuscles.length > 0) {
        const targetAdditionalMusclesIds: Array<number> = req.body.exercise.additionalMuscles.map((item: any) => item.id)

        await queryRunner.manager
          .createQueryBuilder()
          .relation(Exercises, "additionalMuscles")
          .of(CreatedExercise.raw[0].id)
          .add(targetAdditionalMusclesIds)
      }

      // Добавление в избранное
      if (req.body.exercise.favorite) {
        await queryRunner.manager
          .createQueryBuilder()
          .relation(Users, "favoriteExercises")
          .of(req.body.userId)
          .add(CreatedExercise.raw[0].id)
      }

      // Добавление в закрепленное
      if (req.body.exercise.pinned) {
        await queryRunner.manager
          .createQueryBuilder()
          .relation(Users, "pinnedExercises")
          .of(req.body.userId)
          .add(CreatedExercise.raw[0].id)
      }

      // Формирование ответа от сервера
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
          trainingPlace: req.body.exercise.trainingPlace,
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

      await queryRunner.commitTransaction()

      return res.status(200).json(response)
    } catch (error) {
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }

    return res.status(400).json({
      errors: [
        {
          field: null,
          errorMessage: 'Bad Request'
        }
      ]
    })
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
