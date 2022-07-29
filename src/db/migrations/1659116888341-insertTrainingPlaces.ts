import { MigrationInterface, QueryRunner } from "typeorm"

export class insertTrainingPlaces1659116888341 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO training_places (id, title)
      VALUES
        ('ALL', 'Любое'),
        ('HOME', 'Дом'),
        ('GYM', 'Спротзал'),
        ('OUTDOORS', 'На улице');
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM training_places WHERE id = 'ALL' OR id = 'HOME' OR id = 'GYM' OR id = 'OUTDOORS' OR;`
    )
  }

}
