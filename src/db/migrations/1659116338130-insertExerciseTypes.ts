import { MigrationInterface, QueryRunner } from "typeorm"

export class insertExerciseTypes1659116338130 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO exercise_types (id, title)
      VALUES
        (1, 'Базовое'),
        (2, 'Изолирующее');
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM exercise_exertions WHERE title = 'Базовое' OR title = 'Изолирующее' OR;`
    )
  }

}
