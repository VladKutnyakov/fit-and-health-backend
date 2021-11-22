import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, ManyToOne, ManyToMany, OneToOne, JoinTable, JoinColumn } from 'typeorm'
import { Users } from './Users'
import { TrainingPrograms } from './TrainingPrograms'
import { TrainingProcesses } from './TrainingProcesses'

@Entity()
export class TrainingDiaries {

  @PrimaryGeneratedColumn({
    comment: 'ID записи в тренировочном дневнике'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
    unique: false,
    comment: 'Дата тренировки'
  })
  date: string

  @ManyToOne(() => TrainingPrograms, trainingProgramDay => trainingProgramDay.trainingDiaries)
  trainingProgram: TrainingPrograms[]

  @OneToOne(() => TrainingProcesses, trainingProcesses => trainingProcesses.trainingDiary)
  @JoinColumn()
  trainingProcesses: TrainingProcesses[]

  @ManyToOne(() => Users, user => user.trainingDiaries)
  user: Users

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
