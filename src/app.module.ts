import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletModule } from './wallet/wallet.module';
import { DigitalCurrencyModule } from './digital-currency/digital-currency.module';
import { TransactionModule } from './transaction/transaction.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, JwtModule, 
    ConfigModule.forRoot({
      isGlobal: false,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }), WalletModule, DigitalCurrencyModule, TransactionModule, ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
