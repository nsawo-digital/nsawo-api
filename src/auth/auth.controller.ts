import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from 'src/dtos';
import { Public } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()//custom decorator to prevent jwt checking
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDTO: SignInDto){
        return this.authService.signIn(signInDTO.username, signInDTO.password);
    }
}
