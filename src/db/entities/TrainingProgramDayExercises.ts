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
    type: 'varchar',
    nullable: true,
    unique: false,
    comment: 'Кол-во подходов'
  })
  approaches!: string

  @Column({
    type: 'varchar',
    nullable: true,
    unique: false,
    comment: 'Кол-во повторений'
  })
  repeats!: string

  @Column({
    type: 'float',
    nullable: true,
    unique: false,
    comment: 'Дополнительный вес (отягощение)'
  })
  additionalWeight!: number

  @Column({
    type: 'varchar',
    nullable: true,
    unique: false,
    comment: 'Время выполнения упражнения'
  })
  implementationTime!: string

  @Column({
    type: 'varchar',
    nullable: true,
    unique: false,
    comment: 'Время отдыха после выполнения упражнения'
  })
  restTime!: string

  @ManyToOne(() => TrainingProgramDays, trainingProgramDay => trainingProgramDay.trainingProgramDayExercises)
  trainingProgramDay!: TrainingProgramDays

  @ManyToOne(() => Exercises, exercise => exercise.trainingProgramDayExercises)
  exercise!: Exercises

}
