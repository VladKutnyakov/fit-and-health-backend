import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { TrainingProgramDays } from './TrainingProgramDays'

@Entity()
export class TrainingTypes {

  @PrimaryGeneratedColumn({
    comment: 'ID типа тренировки'
  })
  id: number

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
    comment: 'Название типа тренировки'
  })
  title: string

  @OneToMany(() => TrainingProgramDays, trainingProgramDays => trainingProgramDays.trainingType)
  trainingProgramDays: TrainingProgramDays[]

}
