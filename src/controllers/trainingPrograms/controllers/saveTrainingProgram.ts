import { Request, Response } from "express"
import { getConnection, getRepository } from "typeorm"
import { TrainingPrograms } from "../../../db/entities/TrainingPrograms"
import { TrainingProgramDays } from '../../../db/entities/TrainingProgramDays'
import { TrainingProgramDayExercises } from '../../../db/entities/TrainingProgramDayExercises'
import { Exercises } from '../../../db/entities/Exercises'
import { Users } from '../../../db/entities/Users'
import { Skills } from '../../../db/entities/Skills'
import { TrainingTypes } from '../../../db/entities/TrainingTypes'

export const saveTrainingProgram = async (req: Request, res: Response): Promise<Response> => {
  // console.log(req.body.trainingProgram.trainingProgramDays)

  try {
    // ПРОВЕРКА, передаются ли данные о тренировочной программе в req.body.trainingProgram
    if (!req.body.trainingProgram) {
      return res.status(400).json({
        errorMessage: 'Данные о тренировочной программе не переданы.'
      })
    }

    // ПРОВЕРКА, указано ли название в тренировочной программе
    if (!req.body.trainingProgram.title) {
      return res.status(400).json({
        errorMessage: 'Не указано название тренировочной программы.'
      })
    }

    // ТРАНЗАКЦИЯ
    const connection = getConnection()
    const queryRunner = connection.createQueryRunner()

    await queryRunner.startTransaction()

    try {
      // Создание в БД тренировочной программы
      const CreatedTrainingProgram = await getRepository(TrainingPrograms)
        .createQueryBuilder('trainingPrograms')
        .insert()
        .into(TrainingPrograms)
        .values([{
            title: req.body.trainingProgram.title,
            description: req.body.trainingProgram.description,
            // image: req.body.trainingProgram.image,
            skill: getRepository(Skills).create({
              id: req.body.trainingProgram.skill?.id,
            }),
            user: getRepository(Users).create({
              id: req.body.userId
            }),
          }])
        .execute()
      // console.log(CreatedTrainingProgram.identifiers[0].id)

      // Формируем массив тренировочных дней для сохранения
      const DaysList: any = []
      const TrainingDays = req.body.trainingProgram.trainingProgramDays

      TrainingDays.forEach((element: any) => {
        DaysList.push({
          title: element.title,
          comment: element.comment,
          trainingProgram: getRepository(TrainingPrograms).create({
            id: CreatedTrainingProgram.identifiers[0].id,
          }),
          trainingType: getRepository(TrainingTypes).create({
            id: element.trainingType.id,
          }),
        })
      })
      // console.log(DaysList)

      // Создание в БД тренировочных дней
      const CreatedTrainingProgramDays = await getRepository(TrainingProgramDays)
        .createQueryBuilder('trainingProgramDays')
        .insert()
        .into(TrainingProgramDays)
        .values(DaysList)
        .execute()
      // console.log(CreatedTrainingProgramDays)

      // Формируем массив с упражнениями для каждого тренировочного дня
      const ExercisesList: any = []
      TrainingDays.forEach((element: any, index: number) => {
        for (let i = 0; i < element.trainingProgramDayExercises.length; i++) {
          ExercisesList.push({
            approaches: element.trainingProgramDayExercises[i].approaches,
            repeats: element.trainingProgramDayExercises[i].repeats,
            additionalWeight: element.trainingProgramDayExercises[i].additionalWeight,
            implementationTime: element.trainingProgramDayExercises[i].implementationTime,
            restTime: element.trainingProgramDayExercises[i].restTime,
            trainingProgramDay: getRepository(TrainingProgramDays).create({
              id: CreatedTrainingProgramDays.identifiers[index].id,
            }),
            exercise: getRepository(Exercises).create({
              id: element.trainingProgramDayExercises[i].id,
            })
          })
        }
      })
      // console.log(ExercisesList)

      // Создание в БД упражнений для тренировочных дней
      const CreatedTrainingProgramDayExercises = await getRepository(TrainingProgramDayExercises)
        .createQueryBuilder('trainingProgramDayExercises')
        .insert()
        .into(TrainingProgramDayExercises)
        .values(ExercisesList)
        .execute()
      // console.log(CreatedTrainingProgramDayExercises)

      // Создание в БД призанка "избранная" тренировочная программа
      // if (req.body.product.favorite) {
      //   await getConnection()
      //   .createQueryBuilder()
      //   .relation(Users, "favoriteProducts")
      //   .of(req.body.userId)
      //   .add(CreatedProduct.raw[0].id)
      // }

      // Создание в БД призанка "закрепленная" тренировочная программа
      // if (req.body.product.pinned) {
      //   await getConnection()
      //   .createQueryBuilder()
      //   .relation(Users, "pinnedProducts")
      //   .of(req.body.userId)
      //   .add(CreatedProduct.raw[0].id)
      // }

      await queryRunner.commitTransaction()
    } catch (error) {
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }

    const response = {
      data: req.body.trainingProgram
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}
