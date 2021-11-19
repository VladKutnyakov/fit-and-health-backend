import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Recipes } from './Recipes'

@Entity()
export class RecipeSteps {

  @PrimaryGeneratedColumn({
    comment: 'ID этапа приготовления'
  })
  id: number

  @Column({
    type: 'text',
    nullable: true,
    unique: false,
    comment: 'Описание этапа приготовления'
  })
  description!: string

  @ManyToOne(() => Recipes, recipe => recipe.recipeSteps)
  recipe!: Recipes

}
