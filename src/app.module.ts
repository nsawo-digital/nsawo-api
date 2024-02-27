import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletModule } from './wallet/wallet.module';
import { DigitalCurrencyModule } from './digital-currency/digital-currency.module';
import { TransactionModule } from './transaction/transaction.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/users.entity';
import { Wallet } from './wallet/wallet.entity';
import { Tx } from './transaction/transaction.entity';
import { DigitalCurrency } from './digital-currency/digital-currency.entity';

@Module({
  imports: [UsersModule, JwtModule,
    ConfigModule.forRoot({ isGlobal: true}),
    TypeOrmModule.forRootAsync({ imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      entities: [User, Wallet, Tx, DigitalCurrency],
      sslmode: 'require',
      synchronize: false,
    }),
    inject: [ConfigService],
  }), WalletModule, DigitalCurrencyModule, TransactionModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],

})

export class AppModule {

}
