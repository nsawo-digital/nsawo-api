import { Controller, Get, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
    constructor(
        private txService: TransactionService,
    ) {}

    @Get('/user/:userId')
    findByUserId(@Param('userId') userId: string){
        return this.txService.getTransactionsByUserId(userId);
    }
    
    @Get('/wallet/:walletId')
    findByWalletId(@Param('walletId') walletId: string){
        return this.txService.getTransactionsByWallet(walletId);
    }
}
