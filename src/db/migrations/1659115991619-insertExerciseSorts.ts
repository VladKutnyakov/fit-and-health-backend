import { MigrationInterface, QueryRunner } from "typeorm"

export class insertExerciseSorts1659115991619 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO exercise_sorts (id, title)
      VALUES
        (1, 'Статическое'),
        (2, 'Динамическое'),
        (3, 'Силовое'),
        (4, 'Аэробное'),
        (5, 'Растяжка');
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        DELETE FROM exercise_sorts
        WHERE
          title = 'Статическое' OR
          title = 'Динамическое' OR
          title = 'Силовое' OR
          title = 'Аэробное' OR
          title = 'Растяжка';
      `
    )
  }

}
