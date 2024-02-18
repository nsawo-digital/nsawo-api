import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDTO, TransactDTO } from 'src/dtos';

@Controller('wallet')
export class WalletController {
    constructor(
        private walletService: WalletService
        ) {}

    @Get(':id')
    getWallet(@Param(':id') id: string){
        return this.walletService.findOne(id);
    }

    @HttpCode(HttpStatus.OK)
    @Post('/deposit/:id')
    deposit(@Body() transactDTO: TransactDTO, @Param(':id') id: string){
        return this.walletService.deposit(id, transactDTO.amount)
    }

    @HttpCode(HttpStatus.OK)
    @Post('/withdraw/:id')
    withdraw(@Body() transactDTO: TransactDTO, @Param(':id') id: string){
        return this.walletService.withdraw(id, transactDTO.amount, transactDTO.password)
    }

}
