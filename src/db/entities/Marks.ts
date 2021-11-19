import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'
import { MealPlaners } from './MealPlaners'
import { Recipes } from './Recipes'
import { TrainingPrograms } from './TrainingPrograms'

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

  @ManyToMany(() => MealPlaners, mealPlaner => mealPlaner.marks)
  mealPlanerMarks: MealPlaners[]

  @ManyToMany(() => Recipes, recipe => recipe.marks)
  recipeMarks: Recipes[]

  @ManyToMany(() => TrainingPrograms, trainingProgram => trainingProgram.marks)
  trainingProgramsMarks: TrainingPrograms[]

}
