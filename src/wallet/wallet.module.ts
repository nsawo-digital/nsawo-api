import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet]), TransactionModule,
],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService, TypeOrmModule]
})
export class WalletModule {}
