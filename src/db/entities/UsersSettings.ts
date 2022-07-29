import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn } from 'typeorm'
// import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max} from "class-validator"
import { Users } from './Users'

@Entity()
export class UsersSettings {

  @PrimaryGeneratedColumn({
    comment: 'ID настроек пользователя'
  })
  id: number

  @OneToOne(() => Users, user => user.settings)
  @JoinColumn()
  user: Users

}
