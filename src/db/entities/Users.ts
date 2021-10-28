import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToMany, JoinTable } from "typeorm"
// import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max} from "class-validator"
import { Tokens } from './Tokens'
import { UsersProfiles } from './UsersProfiles'
import { Products } from './Products'

@Entity()
export class Users {

  @PrimaryGeneratedColumn({
    comment: 'ID пользователя'
  })
  id: number

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
    comment: 'Электронная почта пользователя'
  })
  email: string

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
    comment: 'Пароль пользователя для входа'
  })
  password: string

  @OneToMany(() => Tokens, tokens => tokens.user)
  tokens: Tokens[]

  @OneToOne(() => UsersProfiles, profile => profile.user)
  profile: UsersProfiles

  @OneToMany(() => Products, products => products.user)
  products: Products[]

  @ManyToMany(() => Products)
  @JoinTable()
  favoriteProducts: Products[]

  @ManyToMany(() => Products)
  @JoinTable()
  pinnedProducts: Products[]

}
