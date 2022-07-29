import { MigrationInterface, QueryRunner } from "typeorm"

export class insertMuscles1659117633825 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO muscles (id, title)
      VALUES
        (1, 'Шея'),
        (2, 'Трапеции'),
        (3, 'Плечи'),
        (4, 'Грудь'),
        (5, 'Широчайшие'),
        (6, 'Бицепсы'),
        (7, 'Трицепсы'),
        (8, 'Предплечья'),
        (9, 'Пресс'),
        (10, 'Средняя часть спины'),
        (11, 'Поясница'),
        (12, 'Ягодицы'),
        (13, 'Абдукторы'),
        (14, 'Квадрицепсы'),
        (15, 'Аддукторы'),
        (16, 'Бицепсы ног'),
        (17, 'Икры');
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM muscles WHERE id IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17);`
    )
  }

}
