import { BadRequestException, Inject, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { TransactionService } from 'src/transaction/transaction.service';
import { comparePasswords } from 'src/utils/password.util';
import { DigitalCurrency } from 'src/digital-currency/digital-currency.entity';
import { Tx } from 'src/transaction/transaction.entity';

@Injectable()
export class WalletService {
    constructor(
        @InjectRepository(Wallet)
        @Inject(TransactionService)
        private walletRepository: Repository<Wallet>,
        private transactionService: TransactionService,
    ) {}

    async findOne(id: string): Promise<Wallet> {
        return this.walletRepository.findOne({ where: {id: id} , relations: {
            txs: true,
        }});
    }

    async findByUserId(userId: string): Promise<Wallet[]> {
        return this.walletRepository.find({where: {user: {id: userId}}})
    }

    async create(name: string, user: User, digitalCurrency: DigitalCurrency): Promise<Wallet> {

        const wallet = await this.walletRepository.create({
            name: name,
            user: user,
            digitalCurrency: digitalCurrency,
        })

        if(!wallet) throw new NotImplementedException("Failed to store wallet to database")

        return wallet;
    }
    
    async update(id: string, wallet: Wallet): Promise<Wallet> {
        await this.walletRepository.update(id, wallet);
        return this.walletRepository.findOneBy({ id });
    }

    convertToCrypto(amount: number, wallet: Wallet): number {
        const cryptStanding = wallet.digitalCurrency.worthInDollars;
        const realValue = amount / cryptStanding;
        return realValue;
    }

    convertFromCrypto(amount: number, wallet: Wallet): number {
        const cryptStanding = wallet.digitalCurrency.worthInDollars;
        const realValue = amount * cryptStanding;
        return realValue;
    }

    async deposit(id: string, amount: number): Promise<Wallet> {
        let wallet = await this.walletRepository.findOne({where: {id: id}});
        if(!wallet){
            throw new NotFoundException("Wallet Not found")
        }

        const newBalance = Number(wallet.balance) + Number(amount);
        wallet.balance = newBalance;

        await this.transactionService.deposit(wallet, amount);

        return this.walletRepository.save(wallet);
    }

    async withdraw(id: string, amount: number, password: string): Promise<Wallet>{
        let wallet = await this.walletRepository.findOne({where: {id: id}, relations: {user: true}});
        if(!wallet){
            throw new NotFoundException("Wallet Not found")
        }

        let authenticated = await comparePasswords(password, wallet.user.password)
        let hasEnoughBalance = (Number(wallet.balance) >= Number(amount))

        if(!authenticated){
            throw new BadRequestException("Wrong password provided");
        }
        if(!hasEnoughBalance){
            throw new NotImplementedException('Insufficient balance')
        }

        wallet.balance = (Number(wallet.balance) - Number(amount));

        this.transactionService.withdraw(wallet, amount);
        console.log('Balance: ' + wallet.balance);

        return this.walletRepository.save(wallet)
    }

    async remove(id: number): Promise<void> {
        await this.walletRepository.delete(id);
    }
}
