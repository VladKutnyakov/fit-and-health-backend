import { Request, Response } from "express"
import { getConnection, getRepository } from "typeorm"
import { TrainingPrograms } from "../db/entities/TrainingPrograms"
import { TrainingProgramDays } from '../db/entities/TrainingProgramDays'
import { Users } from '../db/entities/Users'

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
    // const connection = getConnection()
    // const queryRunner = connection.createQueryRunner()
    // await queryRunner.startTransaction()
    // try {
    //   // await queryRunner.manager.save(user1)

    //   await queryRunner.commitTransaction()
    // } catch (error) {
    //   await queryRunner.rollbackTransaction()
    // } finally {
    //   await queryRunner.release()
    // }

    // Создание в БД тренировочной программы
    const CreatedTrainingProgram = await getRepository(TrainingPrograms)
      .createQueryBuilder('trainingPrograms')
      .insert()
      .into(TrainingPrograms)
      .values([{
          title: req.body.trainingProgram.title,
          description: req.body.trainingProgram.description,
          // image: req.body.trainingProgram.image,
          skill: getRepository(Users).create({
            id: req.body.trainingProgram.skill?.id,
          }),
          user: getRepository(Users).create({
            id: req.body.userId,
          }),
        }])
      .execute()
    // console.log(CreatedTrainingProgram.identifiers[0].id)

    // Создание в БД тренировочных дней
    const CreatedTrainingProgramDays = await getRepository(TrainingProgramDays)
      .createQueryBuilder('trainingProgramDays')
      .insert()
      .into(TrainingProgramDays)
      .values([
        {
          title: 't',
          comment: 'c',
          trainingProgram: getRepository(TrainingPrograms).create({
            id: CreatedTrainingProgram.identifiers[0].id,
          }),
        }
      ])
      .execute()

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
