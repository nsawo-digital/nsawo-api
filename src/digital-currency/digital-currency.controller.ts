import { Controller, Get } from '@nestjs/common';
import { DigitalCurrencyService } from './digital-currency.service';
import { Public } from 'src/auth/auth.guard';

@Controller('digital-currency')
export class DigitalCurrencyController {
    constructor (private digitalCurrencyService: DigitalCurrencyService) {}

    //@Public()
    @Get()
    getAll(){
        return this.digitalCurrencyService.getAll()
    }

    @Public()
    @Get('/seed')
    seed(){
        return this.digitalCurrencyService.seed()
    }

}
