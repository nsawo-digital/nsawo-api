import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DigitalCurrency } from 'src/digital-currency/digital-currency.entity';
import { Tx } from 'src/transaction/transaction.entity';
import { User } from 'src/users/users.entity';
import { Wallet } from 'src/wallet/wallet.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Wallet, User, DigitalCurrency, Tx])],
    exports: [TypeOrmModule]
})
export class EntitiesModule {}
