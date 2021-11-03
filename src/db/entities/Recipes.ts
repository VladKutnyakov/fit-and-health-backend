import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { Users } from './Users'
import { Products } from './Products'

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

  @ManyToMany(() => Products)
  @JoinTable({ name: 'recipe_products' })
  products: Products[]

}
