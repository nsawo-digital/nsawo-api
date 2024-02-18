import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { Wallet } from 'src/wallet/wallet.entity';
import { Tx } from './transaction.entity';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(User)
        @InjectRepository(Wallet)
        @InjectRepository(Tx)
        private readonly userRepository: Repository<User>,
        private walletRepository: Repository<Wallet>,
        private txRepository: Repository<Tx>,
    ) {}
    
    async getTransactionsByUserId(userId: string) {
        const user = await this.userRepository.findOne({ where: {id: userId}, relations: {txs: true}});
    
        if (!user) {
          throw new NotFoundException("User Not found");
        }

        return user.txs;
    }

    async getTransactionsByWallet(walletId: string) {
        const wallet = await this.walletRepository.findOne({ where: {id: walletId}, relations: {txs: true}});

        if(!wallet){
            throw new NotFoundException("Wallet not found");
        }

        return wallet.txs;
    }

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