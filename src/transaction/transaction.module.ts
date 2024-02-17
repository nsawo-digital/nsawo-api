import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tx } from './transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tx])],
  providers: [TransactionService]
})
export class TransactionModule {}
