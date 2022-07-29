import { DataSource } from 'typeorm'

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin",
  database: "fit_and_health",
  synchronize: false,
  logging: false,
  entities: [
    "src/db/entities/**/*.ts"
  ],
  migrations: [
    "src/db/migrations/**/*.ts"
  ],
  migrationsRun: true,
  subscribers: [
    "src/db/subscribers/**/*.ts"
  ],
  // cli: {
  //   entitiesDir: "src/db/entity",
  //   migrationsDir: "src/db/migration",
  //   subscribersDir: "src/db/subscriber",
  // }
})
