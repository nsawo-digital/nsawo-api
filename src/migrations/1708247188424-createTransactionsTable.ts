import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTransactionsTable1708247188424 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        CREATE TABLE "tx" (
          "id" uuid PRIMARY KEY,
          "amount" decimal(10,2) NOT NULL DEFAULT 0.0,
          "txType" character varying NOT NULL,
          "balance" decimal(10,2) NOT NULL DEFAULT 0.0,
          "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
          "walletId" uuid REFERENCES "wallet"("id") ON DELETE CASCADE,
          "userId" uuid REFERENCES "user"("id") ON DELETE CASCADE
        );
      `);
  
    }
  
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DROP TABLE "tx";`);
    }
}
