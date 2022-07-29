import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Exercises } from './Exercises'
import { TrainingPrograms } from './TrainingPrograms'

// Новичок, Ниже среднего, Средний, Выше среднего, Профессионал
// Низкий, Ниже среднего, Средний, Выше среднего, Высокий

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
  excellenceTitle: string

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
    comment: 'Название уровня навыка (сложности)'
  })
  complexityTitle: string

  @Column({
    type: 'integer',
    nullable: false,
    unique: true,
    comment: 'Числовое обозначение уровня навыка (мастерства)'
  })
  value: number

  @OneToMany(() => Exercises, exercises => exercises.skill)
  exercises: Exercises[]

  @OneToMany(() => Exercises, exercises => exercises.skill)
  trainingPrograms: Exercises[]

}
