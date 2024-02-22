import {
    CanActivate,
    ExecutionContext,
    Injectable,
    SetMetadata,
    UnauthorizedException,
  } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
  import { JwtModule, JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {

        //prevent authguard from intercepting public routes eg Login
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
          ]);
          if (isPublic) {
            return true;
          }
          //this 'return true' below should be removed once jwt problems are resolved
          return true;

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        //console.log(token)
        console.log(`unCoiled Secret:` + typeof process.env.SECRET_KEY)
        console.log(`Coiled Secret: ${typeof process.env.SECRET_KEY}`)
        if (!token) {
            throw new UnauthorizedException("No jwt token was found");
        }
        try {
            const payload = await this.jwtService.verifyAsync(
              token,
              {
                  secret: process.env.SECRET_KEY
              }
            );

            request['user'] = payload;
        } catch {
            throw new UnauthorizedException('The jwt doesnt match');
        }
        return true;
        }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];

      return type.includes("Bearer") ? token : undefined;
    }
  }

//creating a custom decorator to prevent the authGuard from 
//intercepting some routes eg login
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);