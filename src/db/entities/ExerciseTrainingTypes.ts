import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany } from 'typeorm'
import { Exercises } from './Exercises'

// Домашнее
// Спортзал

@Entity()
export class ExerciseTrainingTypes {

  // @PrimaryGeneratedColumn({
  //   comment: 'ID типа тренировки у упражнения'
  // })
  // id: number

  @PrimaryColumn({
    type: 'varchar',
    nullable: false,
    unique: true,
    comment: 'ENUM типа тренировки у упражнения'
  })
  id: string

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
    comment: 'Название типа тренировки у упражнения'
  })
  title: string

  @OneToMany(() => Exercises, exercises => exercises.trainingType)
  exercises: Exercises[]

}
