import { Module } from '@nestjs/common';
import { DigitalCurrencyService } from './digital-currency.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DigitalCurrency } from './digital-currency.entity';
import { DigitalCurrencyController } from './digital-currency.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DigitalCurrency])],
  exports: [TypeOrmModule],
  providers: [DigitalCurrencyService],
  controllers: [DigitalCurrencyController]
})
export class DigitalCurrencyModule {}
