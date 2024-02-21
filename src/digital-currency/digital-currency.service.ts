import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DigitalCurrency } from './digital-currency.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DigitalCurrencyService {
    constructor(
        @InjectRepository(DigitalCurrency)
        private digitalCurrencyRepository: Repository<DigitalCurrency>,
    ) {}

    async getAll() {
        return this.digitalCurrencyRepository.find()
    }

    async create(item: any){
        return this.digitalCurrencyRepository.create(item)
    }

    async seed(){
        const currencies = [{
            name: 'Ethereum',
            abbreviation: "ETH",
            worthInDollars: 20000.2,
        },
         {
            name: 'Bitcoin',
            abbreviation: "BTC",
            worthInDollars: 200230.2,
        }]
        for(let i = 0; i < currencies.length; i++){
            const currency = currencies[i]
            const currencyExsists = await this.digitalCurrencyRepository.exists({where: {name: currency.name}})
            if(!currencyExsists){
                this.digitalCurrencyRepository.create(currency)
            }
        }
        return this.digitalCurrencyRepository.find();
    }
}
