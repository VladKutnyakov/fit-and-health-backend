import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, ManyToOne, ManyToMany, OneToOne, JoinTable } from 'typeorm'
import { Users } from './Users'
import { TrainingPrograms } from './TrainingPrograms'
import { TrainingProgramDays } from './TrainingProgramDays'
import { Exercises } from './Exercises'
import { TrainingDiaries } from './TrainingDiaries'

@Entity()
export class TrainingProcesses {

  @PrimaryGeneratedColumn({
    comment: 'ID тренировочного процесса'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: true,
    unique: false,
    comment: 'Номер подхода'
  })
  approach!: string

  @Column({
    type: 'varchar',
    nullable: true,
    unique: false,
    comment: 'Кол-во выполненных повторений в подходе'
  })
  repeats!: string

  @Column({
    type: 'float',
    nullable: true,
    unique: false,
    comment: 'Дополнительный вес (отягощение)'
  })
  additionalWeight!: number

  @Column({
    type: 'varchar',
    nullable: true,
    unique: false,
    comment: 'Время выполнения упражнения'
  })
  implementationTime!: string

  @Column({
    type: 'varchar',
    nullable: true,
    unique: false,
    comment: 'Время отдыха после выполнения упражнения'
  })
  restTime!: string

  @ManyToOne(() => TrainingPrograms, trainingProgram => trainingProgram.trainingProcesses)
  trainingProgram!: TrainingPrograms

  @ManyToOne(() => TrainingProgramDays, trainingProgramDay => trainingProgramDay.trainingProgramDayExercises)
  trainingProgramDay!: TrainingProgramDays

  @ManyToOne(() => Exercises, exercise => exercise.trainingProgramDayExercises)
  exercise!: Exercises

  @ManyToOne(() => Users, user => user.trainingPrograms)
  user: Users

  @OneToOne(() => TrainingDiaries, trainingDiaries => trainingDiaries.trainingProcesses)
  trainingDiary: TrainingDiaries

  @CreateDateColumn({
    type: 'timestamp',
    comment: 'Дата создания'
  })
  createdAt: Date

  // @UpdateDateColumn()
  // updatedAt: Date

  @DeleteDateColumn({
    type: 'timestamp',
    comment: 'Дата удаления'
  })
  deletedAt: Date

}
