import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'
import { MealPlaners } from './MealPlaners'
import { Recipes } from './Recipes'

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

  @ManyToMany(() => Recipes, exercise => exercise.marks)
  recipeMarks: Recipes[]

  @ManyToMany(() => MealPlaners, exercise => exercise.marks)
  trainingProgramsMarks: MealPlaners[]

}
