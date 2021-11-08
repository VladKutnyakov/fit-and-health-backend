import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn } from 'typeorm'
// import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max} from "class-validator"
import { Users } from './Users'

@Entity()
export class UsersProfiles {

  @PrimaryGeneratedColumn({
    comment: 'ID профиля пользователя'
  })
  id: number

  @Column({
    type: 'text',
    nullable: true,
    unique: false,
    comment: 'Имя пользователя'
  })
  firstName: string | null

  @Column({
    type: 'text',
    nullable: true,
    unique: false,
    comment: 'Отчество пользователя'
  })
  middleName: string | null

  @Column({
    type: 'text',
    nullable: true,
    unique: false,
    comment: 'Фамилия пользователя'
  })
  lastName: string | null

  @Column({
    type: 'text',
    nullable: true,
    unique: false,
    comment: 'Дата рождения пользователя'
  })
  birthday: string | null

  @Column({
    type: 'text',
    nullable: true,
    unique: false,
    comment: 'Телефон пользователя'
  })
  phone: string | null

  @Column({
    type: 'text',
    nullable: true,
    unique: false,
    comment: 'Пол пользователя'
  })
  gender: string | null

  @Column({
    type: 'integer',
    nullable: true,
    unique: false,
    comment: 'Вес пользователя'
  })
  weight: number | null

  @Column({
    type: 'integer',
    nullable: true,
    unique: false,
    comment: 'Рост пользователя'
  })
  height: number | null

  @Column({
    type: 'text',
    nullable: true,
    unique: false,
    comment: 'Город проживания пользователя'
  })
  city: string | null

  @Column({
    type: 'text',
    nullable: true,
    unique: false,
    comment: 'Личный сайт пользователя'
  })
  site: string | null

  @Column({
    type: 'text',
    nullable: true,
    unique: false,
    comment: 'Ссылка на аккаунт в vk пользователя'
  })
  vk: string | null

  @Column({
    type: 'text',
    nullable: true,
    unique: false,
    comment: 'Ссылка на аккаунт в facebook пользователя'
  })
  facebook: string | null

  @Column({
    type: 'text',
    nullable: true,
    unique: false,
    comment: 'Ссылка на аккаунт в instagram пользователя'
  })
  instagram: string | null

  @Column({
    type: 'text',
    nullable: true,
    unique: false,
    comment: 'Ссылка на аккаунт в youtube пользователя'
  })
  youtube: string | null

  @Column({
    type: 'text',
    nullable: true,
    unique: false,
    comment: 'Ссылка на аккаунт в twitter пользователя'
  })
  twitter: string | null

  @Column({
    type: 'text',
    nullable: true,
    unique: false,
    comment: 'Ссылка на аккаунт в skype пользователя'
  })
  skype: string | null

  // subscriptions
  // subscribers
  // sportDirections

  @OneToOne(() => Users, user => user.profile)
  @JoinColumn()
  user: Users

}
