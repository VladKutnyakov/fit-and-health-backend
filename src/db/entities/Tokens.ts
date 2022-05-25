import { Entity, PrimaryColumn, ManyToOne } from 'typeorm'
import { Users } from './Users'

@Entity()
export class Tokens {

  @PrimaryColumn({
    type: 'text',
    nullable: false,
    unique: true,
    comment: 'Токен доступа'
  })
  accessToken: string

  // @PrimaryColumn({
  //   type: 'text',
  //   nullable: false,
  //   unique: true,
  //   comment: 'Токен обновления'
  // })
  // refreshToken: string

  @ManyToOne(() => Users, user => user.tokens)
  user: Users

}
