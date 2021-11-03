import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm"
import { Products } from './Products'
import { Recipes } from './Recipes'

@Entity()
export class RecipeProducts {

  @PrimaryColumn({
    type: 'integer',
    nullable: false,
    unique: false,
    comment: 'ID рецепта'
  })
  recipeId: number

  @PrimaryColumn({
    type: 'integer',
    nullable: false,
    unique: false,
    comment: 'ID продукта'
  })
  productId: number

  @Column({
    type: 'float',
    nullable: false,
    unique: false,
    comment: 'Вес продукта в рецепте'
  })
  weightInRecipe!: number

  @ManyToOne(() => Recipes, recipe => recipe.recipeProducts)
  recipe!: Recipes

  @ManyToOne(() => Products, product => product.recipeProducts)
  product!: Products

}
