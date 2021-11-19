
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import { TrainingPrograms } from './TrainingPrograms'
import { TrainingProgramDayExercises } from './TrainingProgramDayExercises'

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

  @OneToMany(() => TrainingProgramDayExercises, trainingProgramDayExercises => trainingProgramDayExercises.trainingProgramDay)
  trainingProgramDayExercises: TrainingProgramDayExercises[]

  @ManyToOne(() => TrainingPrograms, trainingProgram => trainingProgram.trainingProgramDays)
  trainingProgram: TrainingPrograms

}
