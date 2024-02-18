import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tx } from './transaction.entity';
import { TransactionController } from './transaction.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tx])],
  providers: [TransactionService],
  exports: [TransactionService],
  controllers: [TransactionController]
})
export class TransactionModule {}
