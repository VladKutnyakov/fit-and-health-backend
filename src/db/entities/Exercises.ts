import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Users } from './Users'
import { Muscles } from './Muscles'

@Entity()
export class Exercises {

  @PrimaryGeneratedColumn({
    comment: 'ID упражнения'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
    unique: false,
    comment: 'Название упражнения'
  })
  title: string

  @Column({
    type: 'varchar',
    nullable: false,
    unique: false,
    comment: 'Тип упражнения'
  })
  type: string

  @Column({
    type: 'varchar',
    nullable: false,
    unique: false,
    comment: 'Вид упражнения'
  })
  sort: string

  @Column({
    type: 'varchar',
    nullable: false,
    unique: false,
    comment: 'Необходимое оборудование'
  })
  equipment: string

  @Column({
    type: 'varchar',
    nullable: false,
    unique: false,
    comment: 'Усилие'
  })
  exertion: string

  @Column({
    type: 'varchar',
    nullable: false,
    unique: false,
    comment: 'Уровень подготовки'
  })
  practiceLevel: string

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
    comment: 'Описание упражнения'
  })
  techniqueDescription: string

  @ManyToOne(() => Muscles, targetMuscles => targetMuscles.exerciseTargetMuscle)
  targetMuscles: Muscles

  @ManyToOne(() => Muscles, additionalMuscles => additionalMuscles.exerciseAdditionalMuscle)
  additionalMuscles: Muscles

  // targetMuscles: ['Широчайшие'],
  // analogs: [{id: 1, title: 'test'}],

  @ManyToOne(() => Users, user => user.exercises)
  user: Users

}
