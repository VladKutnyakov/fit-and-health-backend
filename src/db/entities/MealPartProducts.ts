import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm'
import { Products } from './Products'
import { MealParts } from './MealParts'

@Entity()
export class MealPartProducts {

  @PrimaryColumn({
    type: 'integer',
    nullable: false,
    unique: false,
    comment: 'ID приема пищи'
  })
  mealPartId: number

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
    comment: 'Вес продукта в приеме пищи'
  })
  weightInMealPart!: number

  @ManyToOne(() => MealParts, mealPart => mealPart.mealPartProducts)
  mealPart!: MealParts

  @ManyToOne(() => Products, product => product.mealPartProducts)
  product!: Products

}
