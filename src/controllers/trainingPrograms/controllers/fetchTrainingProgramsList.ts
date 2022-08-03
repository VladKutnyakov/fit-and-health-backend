import { Request, Response } from "express"
import { dataSource } from '@/dataSource'
import { TrainingPrograms } from "@/db/entities/TrainingPrograms"

export const fetchTrainingProgramsList = async (req: Request, res: Response): Promise<Response> => {
  try {

    const orderByParams: any = {
      'pinnedForUsers.id': 'ASC',
      // 'trainingPrograms.title': 'ASC',
      // 'trainingPrograms.cardio': 'ASC',
      // 'trainingPrograms.power': 'ASC',
      // 'trainingPrograms.endurance': 'ASC',
      // 'trainingPrograms.flexibility': 'ASC',
      // 'trainingPrograms.skill': 'ASC',
    }
    orderByParams[req.query.orderBy ? `trainingPrograms.${req.query.orderBy}` : 'trainingPrograms.title'] = req.query.sortDirection ? req.query.sortDirection : 'ASC'
    // console.log(orderByParams)

    const TrainingProgramsList = await dataSource.getRepository(TrainingPrograms)
      .createQueryBuilder('trainingPrograms')
      .select([
        'trainingPrograms.id',
        'trainingPrograms.title',
        'trainingPrograms.description',
      ])
      .where("trainingPrograms.user = :id OR trainingPrograms.user IS NULL", { id: req.body.userId })
      .leftJoinAndSelect('trainingPrograms.skill', 'skill')
      .leftJoin('trainingPrograms.favoriteForUsers', 'favoriteForUsers', `${'favoriteForUsers.id'} = ${req.body.userId}`)
      .addSelect(['favoriteForUsers.id'])
      .leftJoin('trainingPrograms.pinnedForUsers', 'pinnedForUsers', `${'pinnedForUsers.id'} = ${req.body.userId}`)
      .addSelect(['pinnedForUsers.id'])
      .leftJoin('trainingPrograms.user', 'user')
      .addSelect(['user.id'])
      .offset(0)
      .limit(10)
      .orderBy(orderByParams)
      .getMany()
    // console.log(TrainingProgramsList)

    const trainingPrograms: Array<any> = []
    for (let i = 0; i < TrainingProgramsList.length; i++) {
      trainingPrograms.push({
        id: TrainingProgramsList[i].id,
        title: TrainingProgramsList[i].title,
        description: TrainingProgramsList[i].description,
        power: 0,
        endurance: 0,
        flexibility: 0,
        cardio: 0,
        skill: TrainingProgramsList[i].skill,
        favorite: TrainingProgramsList[i].favoriteForUsers.length > 0 ? true : false,
        pinned: TrainingProgramsList[i].pinnedForUsers.length > 0 ? true : false,
        user: TrainingProgramsList[i].user,
      })
    }
    // console.log(trainingPrograms)

    return res.status(200).json(trainingPrograms)
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
