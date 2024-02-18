import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDigitalCurrenciesTable1708246768710 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        CREATE TABLE "digital_currency" (
          "id" uuid PRIMARY KEY,
          "name" character varying NOT NULL,
          "abbreviation" character varying NOT NULL,
          "worthInDollars" decimal(10,2) NOT NULL DEFAULT 10000.0,
          "picture" character varying,
          CONSTRAINT "UQ_DIGITAL_CURRENCY_ABBREVIATION" UNIQUE ("abbreviation")
        );
      `);
  
    }
  
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DROP TABLE "digital_currency";`);
    }
}
