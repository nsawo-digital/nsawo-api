import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDTO } from 'src/dtos';

@Controller('wallet')
export class WalletController {
    constructor(
        private walletService: WalletService
        ) {}

    @Get('/user/:userId')
    getUserWallets(@Param(':userId') userId: string){
        return this.walletService.findForUser(userId)
    }

    @Get(':id')
    getWallet(@Param(':id') id: string){
        return this.walletService.findOne(id);
    }

    @HttpCode(HttpStatus.OK)
    @Post(':userId')
    create(@Body() createWalletDTO: CreateWalletDTO, @Param(':userId') userId: string){
        return this.walletService.create(createWalletDTO.name, userId);
    }

}
