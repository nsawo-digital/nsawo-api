import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { comparePasswords } from 'src/utils/password.util';

@Injectable()
export class AuthService {
    constructor(
        @Inject(UsersService)
        private usersService: UsersService,
        private jwtService: JwtService,
        ) {}

    async signIn(username: string, password: string): Promise<{ user: User, access_token: string}> {
        const user = await this.usersService.findByUserName(username);

        if (!user) {
          throw new UnauthorizedException("Wrong Username");
        }


        if (!comparePasswords(password, user.password)) {
          throw new UnauthorizedException("Wrong password");
        }
        
        const payload = { sub: user.id, username: user.username };
        return {
            user: user,
            access_token: await this.jwtService.signAsync(payload),
        };
    }

}
