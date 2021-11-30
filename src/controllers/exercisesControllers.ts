import { Request, Response } from "express"
import { getRepository, getConnection } from "typeorm"
import { Users } from '../db/entities/Users'
import { Muscles } from "../db/entities/Muscles"
import { Exercises } from "../db/entities/Exercises"
import { ExerciseTypes } from "../db/entities/ExerciseTypes"
import { ExerciseSorts } from "../db/entities/ExerciseSorts"
import { ExerciseExertions } from "../db/entities/ExerciseExertions"
import { ExerciseEquipments } from "../db/entities/ExerciseEquipments"

const fetchExercisesList = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ExercisesList = await getRepository(Muscles)
      .createQueryBuilder('muscles')
      .leftJoin('muscles.exercises', 'exercises', `exercises.user = ${req.body.userId} OR exercises.user IS NULL`)
      .addSelect(['exercises.id', 'exercises.title'])
      .leftJoinAndSelect('exercises.additionalMuscles', 'additionalMuscles')
      .leftJoin('exercises.favoriteForUsers', 'favoriteForUsers', `${'favoriteForUsers.id'} = ${req.body.userId}`)
      .addSelect(['favoriteForUsers.id'])
      .leftJoin('exercises.pinnedForUsers', 'pinnedForUsers', `${'pinnedForUsers.id'} = ${req.body.userId}`)
      .addSelect(['pinnedForUsers.id'])
      .leftJoin("exercises.user", "user")
      .addSelect(['user.id'])
      .orderBy({'muscles.id': 'ASC'})
      .getMany()
      // .getSql()
    // console.log(ExercisesList)

    const AllExersicesByMuscles: any = []

    for (let i = 0; i < ExercisesList.length; i++) {
      const list: any = []

      ExercisesList[i].exercises.forEach((element: any) => {
        const item = {
          id: element.id,
          title: element.title,
          additionalMuscles: [],
          favorite: element.favoriteForUsers.length > 0 ? true : false,
          pinned: element.pinnedForUsers.length > 0 ? true : false,
          user: element.user
        }

        list.push(item)
      })

      const ExercisesByMuscle = {
        id: ExercisesList[i].id,
        title: ExercisesList[i].title,
        previewImage: ExercisesList[i].previewImage,
        exercises: list
      }
      AllExersicesByMuscles.push(ExercisesByMuscle)
    }
    // console.log(AllExersicesByMuscles[0])

    const response = {
      updatedToken: req.body.updatedToken,
      data: AllExersicesByMuscles
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
      .select([
        'exercises.id',
        'exercises.title',
        'exercises.techniqueDescription',
        'exercises.power',
        'exercises.endurance',
        'exercises.flexibility',
        'exercises.cardio',
      ])
      .leftJoinAndSelect('exercises.muscleGroup', 'muscles')
      .leftJoinAndSelect('exercises.type', 'type')
      .leftJoinAndSelect('exercises.sort', 'sort')
      .leftJoinAndSelect('exercises.exertion', 'exertion')
      .leftJoinAndSelect('exercises.equipment', 'equipment')
      .leftJoinAndSelect('exercises.skill', 'skill')
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

const changePinnedParam = async (req: Request, res: Response): Promise<Response> => {
  try {
    const User = await getRepository(Users)
    .createQueryBuilder('users')
    .where({id: req.body.userId})
    .select(['users.id'])
    .leftJoin('users.pinnedExercises', 'pinnedExercises')
    .addSelect(['pinnedExercises.id'])
    .getOne()
    // console.log(User)

    let isPinned = false

    if (User) {
      for (let i = 0; i < User?.pinnedExercises.length; i++) {
        if (User?.pinnedExercises[i].id === parseInt(req.params.exerciseId)) {
          isPinned = true
        }
      }
    }

    if (isPinned) {
      // Для user с id=1 удалить занчение pinnedExercises exerciseId=2
      await getConnection()
      .createQueryBuilder()
      .relation(Users, "pinnedExercises")
      .of(req.body.userId)
      .remove(req.params.exerciseId)
    } else {
      // Для user с id=1 установить занчение pinnedExercises exerciseId=2
      await getConnection()
      .createQueryBuilder()
      .relation(Users, "pinnedExercises")
      .of(req.body.userId)
      .add(req.params.exerciseId)
    }

    const response = {
      updatedToken: req.body.updatedToken,
      data: {
        pinned: !isPinned,
        exerciseId: req.params.exerciseId
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

const changeFavoriteParam = async (req: Request, res: Response): Promise<Response> => {
  try {
    const User = await getRepository(Users)
    .createQueryBuilder('users')
    .where({id: req.body.userId})
    .select(['users.id'])
    .leftJoin('users.favoriteExercises', 'favoriteExercises')
    .addSelect(['favoriteExercises.id'])
    .getOne()
    // console.log(User)

    let isFavorite = false

    if (User) {
      for (let i = 0; i < User?.favoriteExercises.length; i++) {
        if (User?.favoriteExercises[i].id === parseInt(req.params.exerciseId)) {
          isFavorite = true
        }
      }
    }

    if (isFavorite) {
      // Для user с id=1 удалить занчение favoriteExercises exerciseId=2
      await getConnection()
      .createQueryBuilder()
      .relation(Users, "favoriteExercises")
      .of(req.body.userId)
      .remove(req.params.exerciseId)
    } else {
      // Для user с id=1 установить занчение favoriteExercises exerciseId=2
      await getConnection()
      .createQueryBuilder()
      .relation(Users, "favoriteExercises")
      .of(req.body.userId)
      .add(req.params.exerciseId)
    }

    const response = {
      updatedToken: req.body.updatedToken,
      data: {
        favorite: !isFavorite,
        exerciseId: req.params.exerciseId
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

const fetchMuscles = async (req: Request, res: Response): Promise<Response> => {
  try {
    const MusclesList = await getRepository(Muscles)
      .createQueryBuilder('muscles')
      .orderBy('id')
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
      .orderBy('id')
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
      .orderBy('id')
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

const fetchExerciseExertions = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ExerciseExertionsList = await getRepository(ExerciseExertions)
      .createQueryBuilder('exerciseExertions')
      .orderBy('id')
      .getMany()
    // console.log(ExercisesList)

    const response = {
      updatedToken: req.body.updatedToken,
      data: ExerciseExertionsList
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json({
      updatedToken: req.body.updatedToken,
      errorMessage: 'Неизвестная ошибка.'
    })
  }
}

const fetchExerciseEquipments = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ExerciseEquipmentsList = await getRepository(ExerciseEquipments)
      .createQueryBuilder('exerciseEquipments')
      .orderBy('id')
      .getMany()
    // console.log(ExercisesList)

    const response = {
      updatedToken: req.body.updatedToken,
      data: ExerciseEquipmentsList
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
  changePinnedParam,
  changeFavoriteParam,
  fetchMuscles,
  fetchExerciseTypes,
  fetchExerciseSorts,
  fetchExerciseExertions,
  fetchExerciseEquipments
}
