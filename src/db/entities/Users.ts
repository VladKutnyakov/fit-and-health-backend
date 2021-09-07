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
    comment: 'Электронная почта пользователя'
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

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
    comment: 'Имя пользователя'
  })
  firstName: string

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
    comment: 'Отчество пользователя'
  })
  middleName: string

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
    comment: 'Фамилия пользователя'
  })
  lastName: string

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
    comment: 'Дата рождения пользователя'
  })
  birthday: string

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
    comment: 'Дата рождения пользователя'
  })
  phone: string

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
    comment: 'Пол пользователя'
  })
  gender: string

  @Column({
    type: 'integer',
    nullable: false,
    unique: false,
    comment: 'Вес пользователя'
  })
  weight: number

  @Column({
    type: 'integer',
    nullable: false,
    unique: false,
    comment: 'Рост пользователя'
  })
  height: number

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
    comment: 'Город проживания пользователя'
  })
  city: string

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
    comment: 'Личный сайт пользователя'
  })
  site: string

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
    comment: 'Ссылка на аккаунт в vk пользователя'
  })
  vk: string

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
    comment: 'Ссылка на аккаунт в facebook пользователя'
  })
  facebook: string

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
    comment: 'Ссылка на аккаунт в instagram пользователя'
  })
  instagram: string

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
    comment: 'Ссылка на аккаунт в youtube пользователя'
  })
  youtube: string

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
    comment: 'Ссылка на аккаунт в twitter пользователя'
  })
  twitter: string

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
    comment: 'Ссылка на аккаунт в skype пользователя'
  })
  skype: string

  // subscriptions
  // subscribers
  // sportDirections

}
