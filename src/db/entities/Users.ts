import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, OneToMany, OneToOne, ManyToMany, JoinTable } from 'typeorm'
import { Tokens } from './Tokens'
import { UsersProfiles } from './UsersProfiles'
import { UsersParams } from './UsersParams'
import { UsersSettings } from './UsersSettings'
import { Products } from './Products'
import { Recipes } from './Recipes'
import { Exercises } from './Exercises'
import { MealPlaners } from './MealPlaners'
import { TrainingPrograms } from './TrainingPrograms'
import { TrainingDiaries } from './TrainingDiaries'
import { TrainingProgramDayExerciseApproaches } from './TrainingProgramDayExerciseApproaches'

@Entity()
export class Users {

  @PrimaryGeneratedColumn({
    comment: 'ID пользователя'
  })
  id: number

  @Column({
    type: 'varchar',
    nullable: true,
    unique: true,
    comment: 'Электронная почта пользователя'
  })
  email: string | null

  @Column({
    type: 'varchar',
    nullable: true,
    unique: false,
    comment: 'Телефон пользователя'
  })
  phone: string | null

  @Column({
    type: 'varchar',
    nullable: false,
    unique: false,
    comment: 'Пароль пользователя для входа'
  })
  password: string

  @OneToMany(() => Tokens, token => token.user)
  tokens: Tokens[]

  @OneToOne(() => UsersProfiles, profile => profile.user)
  profile: UsersProfiles

  @OneToMany(() => UsersParams, param => param.user)
  params: UsersParams[]

  @OneToOne(() => UsersSettings, param => param.user)
  settings: UsersSettings

  @OneToMany(() => Products, product => product.user)
  products: Products[]

  @OneToMany(() => Products, recipe => recipe.user)
  recipes: Recipes[]

  @ManyToMany(() => Products, product => product.favoriteForUsers)
  @JoinTable({ name: 'favorite_products' })
  favoriteProducts: Products[]

  @ManyToMany(() => Products, product => product.pinnedForUsers)
  @JoinTable({ name: 'pinned_products' })
  pinnedProducts: Products[]

  @ManyToMany(() => Recipes, favoriteRecipes => favoriteRecipes.favoriteForUsers)
  @JoinTable({ name: 'favorite_recipes' })
  favoriteRecipes: Recipes[]

  @ManyToMany(() => Recipes, pinnedRecipes => pinnedRecipes.pinnedForUsers)
  @JoinTable({ name: 'pinned_recipes' })
  pinnedRecipes: Recipes[]

  @OneToMany(() => MealPlaners, mealPlaner => mealPlaner.user)
  mealPlaners: MealPlaners[]

  @OneToMany(() => Exercises, exercise => exercise.user)
  exercises: Exercises[]

  @ManyToMany(() => Exercises, exercise => exercise.favoriteForUsers)
  @JoinTable({ name: 'favorite_exercises' })
  favoriteExercises: Exercises[]

  @ManyToMany(() => Exercises, exercise => exercise.pinnedForUsers)
  @JoinTable({ name: 'pinned_exercises' })
  pinnedExercises: Exercises[]

  @OneToMany(() => MealPlaners, mealPlaner => mealPlaner.user)
  trainingPrograms: MealPlaners[]

  @ManyToMany(() => TrainingPrograms, trainingProgram => trainingProgram.favoriteForUsers)
  @JoinTable({ name: 'favorite_training_programs' })
  favoriteTrainingPrograms: TrainingPrograms[]

  @ManyToMany(() => TrainingPrograms, trainingProgram => trainingProgram.pinnedForUsers)
  @JoinTable({ name: 'pinned_training_programs' })
  pinnedTrainingPrograms: TrainingPrograms[]

  @OneToMany(() => TrainingDiaries, trainingDiaries => trainingDiaries.user)
  trainingDiaries: TrainingDiaries[]

  @OneToMany(() => TrainingProgramDayExerciseApproaches, exerciseApproaches => exerciseApproaches.user)
  exerciseApproaches: TrainingProgramDayExerciseApproaches[]

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
