import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, OneToMany, OneToOne, ManyToMany, JoinTable } from "typeorm"
import { Tokens } from './Tokens'
import { UsersProfiles } from './UsersProfiles'
import { Products } from './Products'
import { Recipes } from './Recipes'
import { Exercises } from './Exercises'

@Entity()
export class Users {

  @PrimaryGeneratedColumn({
    comment: 'ID пользователя'
  })
  id: number

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
    comment: 'Электронная почта пользователя'
  })
  email: string

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
    comment: 'Пароль пользователя для входа'
  })
  password: string

  @OneToMany(() => Tokens, tokens => tokens.user)
  tokens: Tokens[]

  @OneToOne(() => UsersProfiles, profile => profile.user)
  profile: UsersProfiles

  @OneToMany(() => Products, products => products.user)
  products: Products[]

  @OneToMany(() => Products, recipes => recipes.user)
  recipes: Recipes[]

  @ManyToMany(() => Products, product => product.favoriteForUsers)
  @JoinTable({ name: 'favorite_products' })
  favoriteProducts: Products[]

  @ManyToMany(() => Products, product => product.pinnedForUsers)
  @JoinTable({ name: 'pinned_products' })
  pinnedProducts: Products[]

  @OneToMany(() => Exercises, exercises => exercises.user)
  exercises: Exercises[]

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
