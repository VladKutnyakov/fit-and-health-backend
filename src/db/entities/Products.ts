import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinTable } from "typeorm"
// import { Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from "class-validator"
import { Users } from './Users'
import { ProductCategories } from './ProductCategories'

@Entity()
export class Products {

  @PrimaryGeneratedColumn({
    comment: 'ID продукта'
  })
  id: number

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
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

  @ManyToOne(() => Users, user => user.products)
  user: Users

  @ManyToOne(() => ProductCategories, category => category.products)
  category: ProductCategories

  // @ManyToMany(() => Users, user => user.favoriteProducts )
  // @ManyToMany(() => Users )
  // @JoinTable()
  // favorite: Users[]

  // @ManyToMany(() => Users)
  // @JoinTable()
  // pinned: Users[]

}
