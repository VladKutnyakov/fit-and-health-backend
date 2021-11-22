import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, ManyToOne, ManyToMany, OneToMany, JoinTable } from 'typeorm'
import { Users } from './Users'
import { Marks } from './Marks'
import { TrainingProgramDays } from './TrainingProgramDays'
import { TrainingProcesses } from './TrainingProcesses'
import { TrainingDiaries } from './TrainingDiaries'

@Entity()
export class TrainingPrograms {

  @PrimaryGeneratedColumn({
    comment: 'ID тренировочной программы'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: false,
    unique: false,
    comment: 'Название тренировочной программы'
  })
  title: string

  @Column({
    type: 'varchar',
    nullable: false,
    unique: false,
    comment: 'Описание тренировочной программы'
  })
  description: string

  @Column({
    type: 'varchar',
    nullable: false,
    unique: false,
    comment: 'Сложность тренировочной программы'
  })
  trainingSkill: string

  @ManyToMany(() => Marks, marks => marks.trainingProgramsMarks)
  @JoinTable({ name: 'training_programs_marks' })
  marks: Marks[]

  @OneToMany(() => TrainingProgramDays, trainingProgramDay => trainingProgramDay.trainingProgram)
  trainingProgramDays: TrainingProgramDays[]

  @OneToMany(() => TrainingProcesses, trainingProcesses => trainingProcesses.trainingProgram)
  trainingProcesses: TrainingProcesses[]

  @ManyToOne(() => Users, user => user.trainingPrograms)
  user: Users

  @ManyToMany(() => Users, user => user.favoriteProducts)
  favoriteForUsers: Users[]

  @ManyToMany(() => Users, user => user.pinnedProducts)
  pinnedForUsers: Users[]

  @OneToMany(() => TrainingDiaries, trainingDiaries => trainingDiaries.trainingProgram)
  trainingDiaries: TrainingDiaries

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
