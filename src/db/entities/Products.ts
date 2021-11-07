import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany } from "typeorm"
import { Users } from './Users'
import { ProductCategories } from './ProductCategories'
import { RecipeProducts } from './RecipeProducts'

@Entity()
export class Products {

  @PrimaryGeneratedColumn({
    comment: 'ID продукта'
  })
  id: number

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
    comment: 'Название продукта'
  })
  title: string

  @Column({
    type: 'float',
    nullable: false,
    unique: false,
    comment: 'Вес'
  })
  weight: number

  @Column({
    type: 'float',
    nullable: false,
    unique: false,
    comment: 'Кол-во белков'
  })
  protein: number

  @Column({
    type: 'float',
    nullable: false,
    unique: false,
    comment: 'Кол-во жиров'
  })
  fats: number

  @Column({
    type: 'float',
    nullable: false,
    unique: false,
    comment: 'Кол-во углеводов'
  })
  carb: number

  @Column({
    type: 'float',
    nullable: false,
    unique: false,
    comment: 'Калорийность'
  })
  kkal: number

  @ManyToOne(() => Users, user => user.products, {
    cascade: true
  })
  user: Users

  @ManyToOne(() => ProductCategories, category => category.products)
  category: ProductCategories

  @ManyToMany(() => Users, user => user.favoriteProducts)
  favoriteForUsers: Users[]

  @ManyToMany(() => Users, user => user.pinnedProducts)
  pinnedForUsers: Users[]

  @OneToMany(() => RecipeProducts, recipeProducts => recipeProducts.product)
  recipeProducts!: RecipeProducts[]

}
