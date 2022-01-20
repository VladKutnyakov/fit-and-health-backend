import { Request, Response } from "express"
import { getConnection, getRepository } from "typeorm"
import { TrainingPrograms } from "../db/entities/TrainingPrograms"
import { TrainingProgramDays } from '../db/entities/TrainingProgramDays'
import { TrainingProgramDayExercises } from '../db/entities/TrainingProgramDayExercises'
import { Exercises } from '../db/entities/Exercises'
import { Users } from '../db/entities/Users'
import { Skills } from '../db/entities/Skills'

const getTrainingPrograms = async (req: Request, res: Response): Promise<Response> => {
  try {
    const TrainingProgramsList = await getRepository(TrainingPrograms)
      .createQueryBuilder('trainingPrograms')
      .where([{user: req.body.userId}, {user: null}])
      .leftJoin("trainingPrograms.user", "user")
      .addSelect(['user.id'])
      .offset(0)
      .limit(10)
      .orderBy({'trainingPrograms.id': 'ASC'})
      .getMany()
    // console.log(TrainingProgramsList)

    const response = {
      updatedToken: req.body.updatedToken,
      data: TrainingProgramsList
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      updatedToken: req.body.updatedToken,
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}

const getTrainingProgramInfo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const TrainingProgramInfo = await getRepository(TrainingPrograms)
      .createQueryBuilder('trainingProgram')
      .select([
        'trainingProgram.id',
        'trainingProgram.title',
        'trainingProgram.description'
      ])
      .where([{id: req.params.trainingProgramId}])
      .leftJoinAndSelect("trainingProgram.trainingProgramDays", "trainingProgramDays")
      .leftJoin('trainingProgramDays.trainingProgramDayExercises', 'trainingProgramDayExercises')
      .addSelect([
        'trainingProgramDayExercises.approaches',
        'trainingProgramDayExercises.repeats',
        'trainingProgramDayExercises.additionalWeight',
        'trainingProgramDayExercises.implementationTime',
        'trainingProgramDayExercises.restTime'
      ])
      .leftJoin('trainingProgramDayExercises.exercise', 'exercise')
      .addSelect([
        'exercise.id',
        'exercise.title',
      ])
      .leftJoinAndSelect('trainingProgram.skill', 'skill')
      .leftJoinAndSelect('trainingProgram.marks', 'marks')
      .leftJoin("trainingProgram.user", "user")
      .addSelect(['user.id'])
      .getOne()
    // console.log(TrainingProgramInfo?.trainingProgramDays[0])

    const response = {
      updatedToken: req.body.updatedToken,
      data: TrainingProgramInfo
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      updatedToken: req.body.updatedToken,
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}

const saveTrainingProgram = async (req: Request, res: Response): Promise<Response> => {
  // console.log(req.body.trainingProgram.trainingProgramDays)

  try {
    // ПРОВЕРКА, передаются ли данные о тренировочной программе в req.body.trainingProgram
    if (!req.body.trainingProgram) {
      return res.status(400).json({
        updatedToken: req.body.updatedToken,
        errorMessage: 'Данные о тренировочной программе не переданы.'
      })
    }

    // ПРОВЕРКА, указано ли название в тренировочной программе
    if (!req.body.trainingProgram.title) {
      return res.status(400).json({
        updatedToken: req.body.updatedToken,
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
          video: element.video,
          trainingProgram: getRepository(TrainingPrograms).create({
            id: CreatedTrainingProgram.identifiers[0].id,
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

      // Формируем массив из массивов с упражнениями для каждого тренировочного дня
      const ExercisesList: any = []
      TrainingDays.forEach((element: any) => {
        for (let i = 0; i < element.trainingProgramDayExercises.length; i++) {
          ExercisesList.push({
            approaches: element.trainingProgramDayExercises[i].approaches,
            repeats: element.trainingProgramDayExercises[i].repeats,
            additionalWeight: element.trainingProgramDayExercises[i].additionalWeight,
            implementationTime: element.trainingProgramDayExercises[i].implementationTime,
            restTime: element.trainingProgramDayExercises[i].restTime,
            trainingProgramDay: getRepository(TrainingProgramDays).create({
              id: CreatedTrainingProgramDays.identifiers[i].id,
            }),
            exercise: getRepository(Exercises).create({
              id: element.trainingProgramDayExercises[i].id,
            })
          })
        }
      })
      // console.log(ExercisesList)

      // Создание в БД упражнения для тренировочных дней
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
      updatedToken: req.body.updatedToken,
      data: req.body.trainingProgram
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      updatedToken: req.body.updatedToken,
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}

const updateTrainingProgram = async (req: Request, res: Response): Promise<Response> => {
  try {

    const response = {
      updatedToken: req.body.updatedToken,
      data: null
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      updatedToken: req.body.updatedToken,
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}

export default {
  getTrainingPrograms,
  getTrainingProgramInfo,
  saveTrainingProgram,
  updateTrainingProgram,
}
