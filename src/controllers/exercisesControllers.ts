import { Request, Response } from "express"
import { getRepository, getConnection } from "typeorm"
import { Muscles } from "../db/entities/Muscles"
import { Exercises } from "../db/entities/Exercises"
import { ExerciseTypes } from "../db/entities/ExerciseTypes"
import { ExerciseSorts } from "../db/entities/ExerciseSorts"

const fetchExercisesList = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ExercisesList = await getRepository(Muscles)
      .createQueryBuilder('muscles')
      .leftJoin('muscles.exercises', 'exercises', `exercises.user = ${req.body.userId} OR exercises.user IS NULL`)
      .addSelect(['exercises.id', 'exercises.title'])
      .leftJoinAndSelect('exercises.additionalMuscles', 'additionalMuscles')
      .leftJoin("exercises.user", "user")
      .addSelect(['user.id'])
      .orderBy({'muscles.id': 'ASC'})
      .getMany()
      // .getSql()

    // console.log(ExercisesList)

    const response = {
      updatedToken: req.body.updatedToken,
      data: ExercisesList
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      updatedToken: req.body.updatedToken,
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}

const fetchExerciseInfo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ExercisesInfo = await getRepository(Exercises)
      .createQueryBuilder('exercises')
      .where([{id: req.params.exerciseId}])
      .select(['exercises.id', 'exercises.title', 'exercises.type', 'exercises.sort', 'exercises.equipment', 'exercises.exertion', 'exercises.practiceLevel', 'exercises.techniqueDescription'])
      .leftJoinAndSelect('exercises.muscleGroup', 'muscles')
      .leftJoinAndSelect('exercises.additionalMuscles', 'additionalMuscles')
      .leftJoin("exercises.user", "user")
      .addSelect(['user.id'])
      .getOne()
      // .getSql()

    // console.log(ExercisesInfo)

    const response = {
      updatedToken: req.body.updatedToken,
      data: ExercisesInfo
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      updatedToken: req.body.updatedToken,
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}

const saveNewExercise = async (req: Request, res: Response): Promise<Response> => {
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

const fetchMuscles = async (req: Request, res: Response): Promise<Response> => {
  try {
    const MusclesList = await getRepository(Muscles)
      .createQueryBuilder('muscles')
      .getMany()
    // console.log(ExercisesList)

    const response = {
      updatedToken: req.body.updatedToken,
      data: MusclesList
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      updatedToken: req.body.updatedToken,
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}

const fetchExerciseTypes = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ExerciseTypesList = await getRepository(ExerciseTypes)
      .createQueryBuilder('exerciseTypes')
      .getMany()
    // console.log(ExercisesList)

    const response = {
      updatedToken: req.body.updatedToken,
      data: ExerciseTypesList
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      updatedToken: req.body.updatedToken,
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}

const fetchExerciseSorts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ExerciseSortsList = await getRepository(ExerciseSorts)
      .createQueryBuilder('exerciseSorts')
      .getMany()
    // console.log(ExercisesList)

    const response = {
      updatedToken: req.body.updatedToken,
      data: ExerciseSortsList
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
  fetchExercisesList,
  fetchExerciseInfo,
  saveNewExercise,
  fetchMuscles,
  fetchExerciseTypes,
  fetchExerciseSorts
}
