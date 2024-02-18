import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { TransactionService } from 'src/transaction/transaction.service';
import { PasswordUtil } from 'src/utils/password.util';

@Injectable()
export class WalletService {
    constructor(
        @InjectRepository(Wallet)
        @InjectRepository(User)
        private walletRepository: Repository<Wallet>,
        private usersRepository: Repository<User>,
        private transactionService: TransactionService,
        private passwordUtil: PasswordUtil,
    ) {}

    async findForUser(userId: string): Promise<Wallet[]> {
        const user =  await this.usersRepository.findOne({where: {id: userId}, relations: {wallets: true}});

        if(!user){
            throw new NotFoundException("User Not Found");
        }

        return user.wallets;
    }

    async findOne(id: string): Promise<Wallet> {
        return this.walletRepository.findOneBy({ id });
    }

    async create(name: string, userId: string): Promise<Wallet> {
        const user = await this.usersRepository.findOneBy({id: userId})
        if(!user){
            throw new NotFoundException("User not found");
        }

        let wallet = this.walletRepository.create({
            name: name,
            user: user,
        })

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
        let wallet = await this.walletRepository.findOneBy({id});
        if(!wallet){
            throw new NotFoundException("Wallet Not found")
        }

        wallet.balance += this.convertToCrypto(amount, wallet);

        this.transactionService.deposit(wallet, amount);

        return this.walletRepository.save(wallet);
    }

    async withdraw(id: string, amount: number, password: string): Promise<Wallet>{
        let wallet = await this.walletRepository.findOneBy({id});
        if(!wallet){
            throw new NotFoundException("Wallet Not found")
        }

        if(!this.passwordUtil.comparePasswords(password, wallet.user.password)){
            throw new BadRequestException("The 2 passwords don't match");
        }

        wallet.balance -= this.convertToCrypto(amount, wallet)

        this.transactionService.withdraw(wallet, amount);

        return this.walletRepository.save(wallet)

    }

    async remove(id: number): Promise<void> {
        await this.walletRepository.delete(id);
    }
}
