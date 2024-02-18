import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { PasswordUtil } from 'src/utils/password.util';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private passwordUtil: PasswordUtil,
        ) {}

    async signIn(username: string, password: string): Promise<{ user: User, access_token: string}> {
        const user = await this.usersService.findOne(username);

        if (await this.passwordUtil.comparePasswords(password, user.password)) {
          throw new UnauthorizedException();
        }
        
        const payload = { sub: user.id, username: user.username };
        return {
            user: user,
            access_token: await this.jwtService.signAsync(payload),
        };
    }

}
