import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateArticleTable1707813526078 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

            await queryRunner.createTable(new Table({
                name: "article",
                columns: [
                    {
                        name: "id",
                        type: "serial",
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: "code",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "description",
                        type: "varchar",
                        isNullable: true,
                    }
                ],
            }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
