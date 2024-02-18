import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { Wallet } from 'src/wallet/wallet.entity';
import { Tx } from './transaction.entity';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Tx)
        private txRepository: Repository<Tx>,
    ) {}

    async deposit(wallet: Wallet, amount: number) {

        const tx = this.txRepository.create({
            amount: amount,
            wallet: wallet,
            user: wallet.user,
            balance: wallet.balance,
            txType: 'deposit',
        })

        if(!tx){
            throw new InternalServerErrorException("Failed to record payment");
        }

        return tx;
    }
    
    async withdraw(wallet: Wallet, amount: number) {

        const tx = this.txRepository.create({
            amount: amount,
            wallet: wallet,
            user: wallet.user,
            balance: wallet.balance,
            txType: 'withdrawal',
        })

        if(!tx){
            throw new InternalServerErrorException("Failed to record payment");
        }

        return tx;
    }
}