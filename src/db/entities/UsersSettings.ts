import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn } from 'typeorm'
// import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max} from "class-validator"
import { Users } from './Users'

@Entity()
export class UsersSettings {

  @PrimaryGeneratedColumn({
    comment: 'ID настроек пользователя'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: true,
    unique: false,
    comment: 'Визуальная тема для сайта'
  })
  browserTheme: string | null

  @Column({
    type: 'varchar',
    nullable: true,
    unique: false,
    comment: 'Визуальная тема для мобильного приложения'
  })
  mobileAppTheme: string | null

  @OneToOne(() => Users, user => user.settings)
  @JoinColumn()
  user: Users

}
