import { MigrationInterface, QueryRunner } from "typeorm"

export class insertSkills1659164743387 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO skills (id, "excellenceTitle", "complexityTitle", value)
      VALUES
        (1, 'Новичок', 'Низкий', 1),
        (2, 'Ниже среднего', 'Ниже среднего', 2),
        (3, 'Средний', 'Средний', 3),
        (4, 'Выше среднего', 'Выше среднего', 4),
        (5, 'Профессионал', 'Высокий', 5);
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM skills WHERE id IN (1, 2, 3, 4, 5);`
    )
  }

}
