import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Exercises } from './Exercises'

@Entity()
export class TrainingProgramDayExerciseApproaches {

  @PrimaryGeneratedColumn({
    comment: 'ID подхода'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: true,
    unique: false,
    comment: 'Дата выполнения подхода'
  })
  date!: string

  @Column({
    type: 'varchar',
    nullable: true,
    unique: false,
    comment: 'Порядковый номер подхода'
  })
  order!: string

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

  @ManyToOne(() => Exercises, exercise => exercise.exerciseApproaches)
  exercise: Exercises

}
