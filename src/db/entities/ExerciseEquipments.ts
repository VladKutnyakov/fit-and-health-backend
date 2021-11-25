import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Exercises } from './Exercises'

@Entity()
export class ExerciseEquipments {

  @PrimaryGeneratedColumn({
    comment: 'ID оборудования для упражнения'
  })
  id: number

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
    comment: 'Название оборудования для упражнения'
  })
  title: string

  @OneToMany(() => Exercises, exercises => exercises.equipment)
  exercises: Exercises[]

}
