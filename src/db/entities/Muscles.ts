import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm'
import { Exercises } from './Exercises'

@Entity()
export class Muscles {

  @PrimaryGeneratedColumn({
    comment: 'ID мышечной группы'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
    unique: false,
    comment: 'Название мышечной группы'
  })
  title: string

  @Column({
    type: 'varchar',
    nullable: true,
    unique: false,
    comment: 'Изображение мышечной группы'
  })
  previewImage: string

  @OneToMany(() => Exercises, exercises => exercises.muscleGroup)
  exercises: Exercises[]

  @ManyToMany(() => Exercises, exercise => exercise.additionalMuscles)
  additionalForExercises: Exercises[]

}
