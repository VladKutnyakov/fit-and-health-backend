import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from "typeorm"
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max} from "class-validator"
import { Users } from './Users'

@Entity()
export class Tokens {

  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
    comment: 'Токен доступа'
  })
  @IsEmail()
  accessToken: string

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
    comment: 'Токен обновления'
  })
  @IsEmail()
  refreshToken: string

  @ManyToOne(() => Users, user => user.tokens)
  user: Users

}
