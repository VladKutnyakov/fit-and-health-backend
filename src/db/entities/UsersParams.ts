import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm'
import { Users } from './Users'

@Entity()
export class UsersParams {

  @PrimaryGeneratedColumn({
    comment: 'ID пользовательских параметров'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: true,
    unique: false,
    comment: 'Дата изменения параметров'
  })
  date: string | null

  @Column({
    type: 'float',
    nullable: true,
    unique: false,
    comment: 'Вес пользователя'
  })
  weight: number | null

  @Column({
    type: 'float',
    nullable: true,
    unique: false,
    comment: 'Желаемый вес пользователя'
  })
  targetWeight: number | null

  @Column({
    type: 'float',
    nullable: true,
    unique: false,
    comment: 'Рост пользователя'
  })
  height: number | null

  // ИМТ
  // Содержание жира
  // Висцеральный жир
  // Содержание воды
  // Содержание мышц
  // Костная масса

  @ManyToOne(() => Users, user => user.params)
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
