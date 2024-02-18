import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWalletsTable1708246991422 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        CREATE TABLE "wallet" (
          "id" uuid PRIMARY KEY,
          "name" character varying NOT NULL,
          "balance" decimal(10,2) NOT NULL DEFAULT 0.0,
          "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
          "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
          "userId" uuid REFERENCES "user"("id") ON DELETE CASCADE,
          "digitalCurrencyId" uuid REFERENCES "digital_currency"("id") ON DELETE CASCADE
        );
      `);
  
    }
  
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DROP TABLE "wallet";`);
    }
}
