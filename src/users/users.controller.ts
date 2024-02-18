import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateWalletDTO, registerUserDTO } from 'src/dtos';
import { User } from './users.entity';

@Controller('user')
export class UsersController {
    constructor(public usersService: UsersService) {}

    @HttpCode(HttpStatus.OK)
    @Post()
    register(@Body() registerUserDTO: registerUserDTO){
        let user = new User;
        user.username = registerUserDTO.username
        user.password = registerUserDTO.password
        user.email = registerUserDTO.email

        return this.usersService.create(user);
    }

    @HttpCode(HttpStatus.OK)
    @Post('/wallet/:userId')
    create(@Body() createWalletDTO: CreateWalletDTO, @Param(':userId') userId: string){
        return this.usersService.createWallet(createWalletDTO.name, userId);
    }

}
