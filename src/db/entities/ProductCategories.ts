import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Products } from './Products'

@Entity()
export class ProductCategories {

  @PrimaryGeneratedColumn({
    comment: 'ID категории продуктов'
  })
  id: number

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
    comment: 'Название категории'
  })
  title: string

  @OneToMany(() => Products, products => products.category)
  products: Products[]

}
