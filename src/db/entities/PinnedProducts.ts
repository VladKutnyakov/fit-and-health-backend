import { Entity, PrimaryColumn, ManyToMany } from "typeorm"
import { Products } from './Products'
import { Users } from "./Users"

@Entity()
export class PinnedProducts {

  @PrimaryColumn({
    nullable: false,
    comment: 'ID пользователя'
  })
  @ManyToMany(() => Users)
  userId: number

  @PrimaryColumn({
    nullable: false,
    comment: 'ID продукта'
  })
  @ManyToMany(() => Products)
  productId: number

}
