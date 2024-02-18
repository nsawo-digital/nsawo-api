import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { WalletService } from 'src/wallet/wallet.service';
import { Wallet } from 'src/wallet/wallet.entity';
import { hashPassword } from 'src/utils/password.util';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        @Inject(WalletService)
        private userRepository: Repository<User>,
        private walletService: WalletService,
    ) {}

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: string): Promise<User> {
        return this.userRepository.findOne({where: {id: id}, relations: {wallets: true, txs: true}});
    }

    async findByUserName(userName: string): Promise<User> {
        return this.userRepository.findOne({where: {username: userName}});
    }

    async create(user: User): Promise<User> {
        const userWithSameUserNameExists = this.userRepository.exists({where: {username: user.username}})
        if(userWithSameUserNameExists){
            throw new ConflictException("Username already taken");
        }
        user.password = await hashPassword(user.password)
        return this.userRepository.save(user);
    }

    async createWallet(name: string, userId: string): Promise<Wallet> {
        const user = await this.userRepository.findOneBy({id: userId})
        if(!user){
            throw new NotFoundException("User not found");
        }

        return this.walletService.create(name, user)
    }
    
    async update(id: string, updateUser: User): Promise<User> {
    await this.userRepository.update(id, updateUser);
    return this.userRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
    }
}
