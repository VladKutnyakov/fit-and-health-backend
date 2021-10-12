import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, OneToOne } from "typeorm"
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max} from "class-validator"
import { Tokens } from './Tokens'
import { UsersProfiles } from './UsersProfiles'

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
  @IsEmail()
  title: string

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
    comment: 'Вес'
  })
  weight: string

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
    comment: 'Кол-во белков'
  })
  protein: string

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
    comment: 'Кол-во жиров'
  })
  fats: string

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
    comment: 'Кол-во углеводов'
  })
  carb: string

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
    comment: 'Калорийность'
  })
  kkal: string

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
    comment: 'Категория'
  })
  category: string

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
    comment: 'ID пользователя, которому принадлежит продукт'
  })
  userId: string

  // @OneToMany(() => Tokens, tokens => tokens.user)
  // tokens: Tokens[]

  // @OneToOne(() => UsersProfiles, profile => profile.user)
  // profile: UsersProfiles

}
