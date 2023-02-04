import { Body, Controller, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController   {
    constructor(private authService: AuthService){}
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req: any){
        return this.authService.login(req.user);
    }
}
