import { ConflictException, Inject, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { WalletService } from 'src/wallet/wallet.service';
import { Wallet } from 'src/wallet/wallet.entity';
import { hashPassword } from 'src/utils/password.util';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        @Inject(WalletService)
        @Inject(JwtService)
        private userRepository: Repository<User>,
        private walletService: WalletService,
        private jwtService: JwtService,
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

    async create(user: User): Promise<{}> {
        const userWithSameUserNameExists = await this.userRepository.exists({where: {username: user.username}})
        if(userWithSameUserNameExists){
            throw new ConflictException("Username already taken");
        }
        //const passwordBeforeHash = user.password
        user.password = await hashPassword(user.password)

        const savedUser = await this.userRepository.save(user);
        if(!savedUser){
            throw new NotImplementedException("Failed to save to Database, Please try again and watch your data")
        }
                
        const payload = { sub: user.id, username: user.username };
        return {
            user: user,
            access_token: await this.jwtService.signAsync(payload),
        };
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
