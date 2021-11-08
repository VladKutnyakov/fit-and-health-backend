import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'
import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max} from "class-validator"

@Entity()
export class Photo {

  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    nullable: true
  })
  title: string

  @Column("text")
  description: string

  @Column()
  @Length(10, 20)
  filename: string

  @Column()
  isPublished: boolean

  // @CreateDateColumn()
  // createdAt: date

  // @UpdateDateColumn()
  // updatedAt: Timestamp

  // @DeleteDateColumn()
  // deletedAt: Timestamp

}

// Типы столбцов для postgres
// int, int2, int4, int8, smallint, integer, bigint, decimal, numeric, real, float, float4, float8, double precision, money, character varying, varchar, character, char, text, citext, hstore, bytea, bit, varbit, bit varying, timetz, timestamptz, timestamp, timestamp without time zone, timestamp with time zone, date, time, time without time zone, time with time zone, interval, bool, boolean, enum, point, line, lseg, box, path, polygon, circle, cidr, inet, macaddr, tsvector, tsquery, uuid, xml, json, jsonb, int4range, int8range,numrange, tsrange, tstzrange, daterange, geometry, geography, cube,ltree



// Валидация полей
// import {getManager} from "typeorm"
// import {validate} from "class-validator"

// let post = new Post()
// post.title = "Hello" // should not pass
// post.text = "this is a great post about hell world" // should not pass
// post.rating = 11 // should not pass
// post.email = "google.com" // should not pass
// post.site = "googlecom" // should not pass

// const errors = await validate(post)
// if (errors.length > 0) {
//     throw new Error(`Validation failed!`)
// } else {
//     await getManager().save(post);
// }

// Созадать миграцию
// npm run typeorm migration:generate -- -n MIGRATION_NAME
// Запустить миграцию
// npm run typeorm migration:run
