import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'
import { MealPlaners } from './MealPlaners'

@Entity()
export class Marks {

  @PrimaryGeneratedColumn({
    comment: 'ID отметки'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
    unique: false,
    comment: 'Название отметки'
  })
  title: string

  @ManyToMany(() => MealPlaners, exercise => exercise.marks)
  mealPlanerMarks: MealPlaners[]

  @ManyToMany(() => MealPlaners, exercise => exercise.marks)
  trainingProgramsMarks: MealPlaners[]

}
