import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max} from "class-validator"

@Entity()
export class Users {

  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
    comment: 'Электроннач почта пользователя'
  })
  @IsEmail()
  email: string

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
    comment: 'Пароль пользователя для входа'
  })
  password: string

}
