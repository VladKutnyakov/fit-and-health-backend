import { Request, Response } from "express"
import { dataSource } from '@/dataSource'
import { TrainingPrograms } from "@/db/entities/TrainingPrograms"

export const fetchTrainingProgramsPageInfo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const TrainingProgramsCount = await dataSource.getRepository(TrainingPrograms).count()

    const UserTrainingProgramsCount = await dataSource.getRepository(TrainingPrograms)
      .createQueryBuilder('trainingPrograms')
      .select([
        'trainingPrograms.id',
      ])
      .where(`trainingPrograms.user = ${req.body.userId}`)
      .getCount()

    const PinnedTrainingProgramsCount = await dataSource.getRepository(TrainingPrograms)
      .createQueryBuilder('trainingPrograms')
      .select([
        'trainingPrograms.id',
      ])
      .leftJoin('trainingPrograms.pinnedForUsers', 'pinnedForUsers', `${'pinnedForUsers.id'} = ${req.body.userId}`)
      .addSelect(['pinnedForUsers.id'])
      .where(`pinnedForUsers.id = ${req.body.userId}`)
      .getCount()

    const FavoriteTrainingProgramsCount = await dataSource.getRepository(TrainingPrograms)
      .createQueryBuilder('trainingPrograms')
      .select([
        'trainingPrograms.id',
      ])
      .leftJoin('trainingPrograms.favoriteForUsers', 'favoriteForUsers', `${'favoriteForUsers.id'} = ${req.body.userId}`)
      .addSelect(['favoriteForUsers.id'])
      .where(`favoriteForUsers.id = ${req.body.userId}`)
      .getCount()

    const response = {
      programs: TrainingProgramsCount,
      userPrograms: UserTrainingProgramsCount,
      pinnedPrograms: PinnedTrainingProgramsCount,
      favoritePrograms: FavoriteTrainingProgramsCount,
    }

    return res.status(200).json(response)
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
