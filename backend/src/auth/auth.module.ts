import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport/dist';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from './auth.constant';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
    controllers: [AuthController],
    imports: [UsersModule, PassportModule, JwtModule.register({ secret: jwtConstants.secret, signOptions: { expiresIn: '1000000000000000000000000s'}})],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
