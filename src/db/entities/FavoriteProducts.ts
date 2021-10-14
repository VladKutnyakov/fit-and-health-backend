import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from "typeorm"
// import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max} from "class-validator"
import { Products } from './Products'
import { Users } from './Users'

@Entity()
export class FavoriteProducts {

  @PrimaryGeneratedColumn({
    comment: 'ID избранного продукта'
  })
  id: number

  // @ManyToOne(() => Products, product => product.user)
  // product: Products

  // @ManyToOne(() => Users, user => user.favoriteProducts)
  // user: Users

}
