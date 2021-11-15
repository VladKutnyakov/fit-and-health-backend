
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany, JoinTable } from 'typeorm'
import { MealPlaners } from '../entities/MealPlaners'
import { MealPartProducts } from './MealPartProducts'
import { Recipes } from './Recipes'

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

  @ManyToOne(() => MealPlaners, mealPlaner => mealPlaner.mealParts)
  mealPlaner: MealPlaners

  @OneToMany(() => MealPartProducts, mealPartProducts => mealPartProducts.mealPart)
  mealPartProducts: MealPartProducts[]

  @ManyToMany(() => Recipes, recipes => recipes.addedToMealParts)
  @JoinTable({ name: 'meal_part_recipes' })
  mealPartRecipes: Recipes[]

}
