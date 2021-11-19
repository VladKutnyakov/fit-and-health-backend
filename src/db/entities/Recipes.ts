import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm'
import { Users } from './Users'
import { RecipeProducts } from './RecipeProducts'
import { RecipeSteps } from './RecipeSteps'
import { MealParts } from './MealParts'
import { Marks } from './Marks'

@Entity()
export class Recipes {

  @PrimaryGeneratedColumn({
    comment: 'ID продукта'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
    unique: false,
    comment: 'Название рецепта'
  })
  title: string

  @Column({
    type: 'text',
    nullable: true,
    unique: false,
    comment: 'Описание рецепта'
  })
  description: string

  @Column({
    type: 'integer',
    nullable: true,
    unique: false,
    comment: 'Время приготовления'
  })
  cookingTimes: number

  @Column({
    type: 'integer',
    nullable: true,
    unique: false,
    comment: 'Сложность приготовления'
  })
  cookingSkill: number

  @ManyToOne(() => Users, user => user.recipes)
  user: Users

  @OneToMany(() => RecipeProducts, recipeProducts => recipeProducts.recipe)
  recipeProducts!: RecipeProducts[]

  @OneToMany(() => RecipeSteps, recipeSteps => recipeSteps.recipe)
  recipeSteps!: RecipeSteps[]

  @ManyToMany(() => Marks, marks => marks.recipeMarks)
  @JoinTable({ name: 'recipe_marks' })
  marks: Marks[]

  @ManyToMany(() => MealParts, mealParts => mealParts.mealPartRecipes)
  addedToMealParts: MealParts[]

  @CreateDateColumn({
    type: 'timestamp',
    comment: 'Дата создания'
  })
  createdAt: Date

  // @UpdateDateColumn()
  // updatedAt: Date

  @DeleteDateColumn({
    type: 'timestamp',
    comment: 'Дата удаления'
  })
  deletedAt: Date

}
