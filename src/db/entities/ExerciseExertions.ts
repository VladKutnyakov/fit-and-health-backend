import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Exercises } from './Exercises'

// Жимовое
// Тяговое
// Статическое

@Entity()
export class ExerciseExertions {

  @PrimaryGeneratedColumn({
    comment: 'ID вида усилия для упражнения'
  })
  id: number

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
    comment: 'Название вида усилия для упражнения'
  })
  title: string

  @OneToMany(() => Exercises, exercises => exercises.exertion)
  exercises: Exercises[]

}
