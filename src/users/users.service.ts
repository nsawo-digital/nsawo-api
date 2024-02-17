import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: string): Promise<User> {
        return this.userRepository.findOneBy({ id });
    }

    async create(user: User): Promise<User> {
        return this.userRepository.save(user);
    }
    
    async update(id: string, updateUser: User): Promise<User> {
    await this.userRepository.update(id, updateUser);
    return this.userRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
    }
}
