import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { WalletModule } from 'src/wallet/wallet.module';
import { TransactionModule } from 'src/transaction/transaction.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), WalletModule, TransactionModule, JwtModule.register({
    global: true,
    secret: `${process.env.SECRET_KEY}`,
    signOptions: { expiresIn: '60s' },
  })],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
