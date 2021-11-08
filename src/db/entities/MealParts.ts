
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { MealPlaners } from '../entities/MealPlaners'

@Entity()
export class MealParts {

  @PrimaryGeneratedColumn({
    comment: 'ID приема пищи'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: true,
    unique: false,
    comment: 'Название приема пищи'
  })
  title: string

  @Column({
    type: 'varchar',
    nullable: true,
    unique: false,
    comment: 'Время приема пищи'
  })
  mealTime: string

  // recipes: [],
  // products: []

  @ManyToOne(() => MealPlaners, mealPlaner => mealPlaner.mealParts)
  mealPlaner: MealPlaners

}
