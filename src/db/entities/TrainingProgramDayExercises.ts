import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm'
import { Exercises } from './Exercises'
import { TrainingProgramDays } from './TrainingProgramDays'

@Entity()
export class TrainingProgramDayExercises {

  @PrimaryColumn({
    type: 'integer',
    nullable: false,
    unique: false,
    comment: 'ID дня тренировочной программы'
  })
  trainingProgramDayId: number

  @PrimaryColumn({
    type: 'integer',
    nullable: false,
    unique: false,
    comment: 'ID упражнения'
  })
  exerciseId: number

  @Column({
    type: 'float',
    nullable: false,
    unique: false,
    comment: 'test'
  })
  testField!: number

  @ManyToOne(() => TrainingProgramDays, trainingProgramDay => trainingProgramDay.trainingProgramDayExercises)
  trainingProgramDay!: TrainingProgramDays

  @ManyToOne(() => Exercises, exercise => exercise.trainingProgramDayExercises)
  exercise!: Exercises

}
