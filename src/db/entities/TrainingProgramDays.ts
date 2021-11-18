
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany, JoinTable } from 'typeorm'
import { TrainingPrograms } from './TrainingPrograms'

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

  @ManyToOne(() => TrainingPrograms, trainingProgram => trainingProgram.trainingProgramDays)
  trainingProgram: TrainingPrograms

}
