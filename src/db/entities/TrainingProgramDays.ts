
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany, JoinTable } from 'typeorm'
import { TrainingPrograms } from './TrainingPrograms'
import { Exercises } from './Exercises'

@Entity()
export class TrainingProgramDays {

  @PrimaryGeneratedColumn({
    comment: 'ID дня тренировочной программы'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: true,
    unique: false,
    comment: 'Название дня тренировочной программы'
  })
  title: string

  @Column({
    type: 'varchar',
    nullable: true,
    unique: false,
    comment: 'Время приема пищи'
  })
  comment: string

  @ManyToMany(() => Exercises, exercises => exercises.favoriteForUsers)
  @JoinTable({ name: 'training_program_day_exercises' })
  exercises: Exercises[]

  @ManyToOne(() => TrainingPrograms, trainingProgram => trainingProgram.trainingProgramDays)
  trainingProgram: TrainingPrograms

}
