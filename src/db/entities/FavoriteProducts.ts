import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
// import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max} from "class-validator"
import { Products } from './Products'
import { Users } from './Users'

@Entity()
export class FavoriteProducts {

  @PrimaryGeneratedColumn({
    comment: 'ID избранного продукта'
  })
  id: number

  @Column({
    type: 'boolean',
    nullable: false,
    unique: false,
    comment: 'Признак активности избранного продукта (true -> "избранный"; false -> "удален из избранного")'
  })
  isActive: boolean

  @ManyToOne(() => Users, user => user.favoriteProducts)
  user: Users

  @ManyToOne(() => Products, products => products.favoriteProducts)
  products: Products

}
