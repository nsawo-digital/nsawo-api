import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from 'src/wallet/wallet.entity';
import { Tx } from './transaction.entity';
import { v4 as uuidv4 } from "uuid";


@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Tx)
        private txRepository: Repository<Tx>,
    ) {}

    async deposit(wallet: Wallet, amount: number) {

        const tx = this.txRepository.save({
            id: uuidv4(),
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

        const tx = this.txRepository.save({
            id: uuidv4(),
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

    async getByUser(userId: string, limit: number, offset: number): Promise<Tx[]>{
        return this.txRepository.find({where: {user: {id: userId}}, take: limit, skip: offset, order: {createdAt: 'DESC'}})
    }

    async getByWallet(walletId: string, limit: number, offset: number): Promise<Tx[]>{
        return this.txRepository.find({where: {wallet: {id: walletId}}, order: {createdAt: 'DESC'}})
    }

}