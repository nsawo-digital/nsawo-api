import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletModule } from './wallet/wallet.module';
import { DigitalCurrencyModule } from './digital-currency/digital-currency.module';
import { TransactionModule } from './transaction/transaction.module';
import { User } from './users/users.entity';
import { Tx } from './transaction/transaction.entity';
import { Wallet } from './wallet/wallet.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, 
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Tx, Wallet],
    synchronize: true, 
    uuidExtension: 'pgcrypto', 
  }), WalletModule, DigitalCurrencyModule, TransactionModule, AuthModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
