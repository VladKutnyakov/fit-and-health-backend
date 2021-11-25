import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Exercises } from './Exercises'

// Базовые упражнения - представляют собой многосуставные упражнения, которые направлены на задействование более одной группы мышц.
// Изолирующие упражнения - направлены на проработку исключительно одной мышцы, то есть с задействованием определенного сустава.

@Entity()
export class ExerciseTypes {

  @PrimaryGeneratedColumn({
    comment: 'ID типа упражнения'
  })
  id: number

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
    comment: 'Название типа упражнения'
  })
  title: string

  @OneToMany(() => Exercises, exercises => exercises.type)
  exercises: Exercises[]

}
