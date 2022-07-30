import { MigrationInterface, QueryRunner } from "typeorm"

export class insertProductCategories1659172522845 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO product_categories (id, title)
      VALUES
        (1, 'Мясо и субпродукты'),
        (2, 'Рыба и морепродукты'),
        (3, 'Яйца и яичные продукты'),
        (4, 'Молоко и молочные продукты'),
        (5, 'Овощи и овощные продукты'),
        (6, 'Фрукты, ягоды, сухофрукты'),
        (7, 'Зелень, травы, листья, салаты'),
        (8, 'Крупы и злаки'),
        (9, 'Мука и продукты из муки'),
        (10, 'Семена'),
        (11, 'Грибы'),
        (12, 'Орехи'),
        (13, 'Жиры и масла'),
        (14, 'Специи и пряности'),
        (15, 'Напитки и соки'),
        (16, 'Сладости и кондитерские изделия');
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM product_categories WHERE id IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);`)
  }

}
