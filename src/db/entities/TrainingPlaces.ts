import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'
import { Exercises } from './Exercises'

// Домашнее - можно выполнять дома
// Спортзал - можно выполнять в тренажерном зале (требуется дополнительное оборудование)

@Entity()
export class TrainingPlaces {

  @PrimaryColumn({
    type: 'varchar',
    nullable: false,
    unique: true,
    comment: 'ENUM места тренировки'
  })
  id: string

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
    comment: 'Название места тренировки'
  })
  title: string

  @OneToMany(() => Exercises, exercises => exercises.trainingPlace)
  exercises: Exercises[]

}
