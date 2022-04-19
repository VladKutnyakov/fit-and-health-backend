import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'
import { Exercises } from './Exercises'

// ALL HOME GYM

@Entity()
export class TrainingPlaces {

  @PrimaryColumn({
    type: 'varchar',
    nullable: false,
    unique: true,
    comment: 'ID типа упражнения'
  })
  id: string

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
    comment: 'Название типа упражнения'
  })
  title: string

  @OneToMany(() => Exercises, exercises => exercises.trainingPlace)
  exercises: Exercises[]

}
