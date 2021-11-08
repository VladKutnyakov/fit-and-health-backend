
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { MealPlaners } from '../entities/MealPlaners'
import { Products } from "./Products"
import { Recipes } from "./Recipes"

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

  @ManyToMany(() => Products, product => product.addedToMealParts)
  @JoinTable({ name: 'meal_part_products' })
  mealPartProducts: Products[]

  @ManyToMany(() => Recipes, recipes => recipes.addedToMealParts)
  @JoinTable({ name: 'meal_part_recipes' })
  mealPartRecipes: Recipes[]

}
