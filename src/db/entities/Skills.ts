import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Exercises } from './Exercises'

@Entity()
export class Skills {

  @PrimaryGeneratedColumn({
    comment: 'ID уровня навыка (мастерства)'
  })
  id: number

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
    comment: 'Название уровня навыка (мастерства)'
  })
  title: string

  @Column({
    type: 'integer',
    nullable: false,
    unique: true,
    comment: 'Числовое обозначение уровня навыка (мастерства)'
  })
  value: number

  @OneToMany(() => Exercises, exercises => exercises.skill)
  exercises: Exercises[]

}
