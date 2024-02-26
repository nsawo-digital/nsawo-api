import { Controller, Get, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
    constructor(
        private txService: TransactionService,
    ) {}

    @Get('/byWallet/:walletId/:limit/:offset')
    getByWallet(@Param('walletId') walletId: string, @Param('limit') limit: number, @Param('offset') offset: number){
        return this.txService.getByWallet(walletId, limit, offset)
    }

    @Get('/byUser/:userId/:limit/:offset')
    getByUser(@Param('walletId') userId: string, @Param('limit') limit: number, @Param('offset') offset: number){
        return this.txService.getByUser(userId, limit, offset)
    }
}
