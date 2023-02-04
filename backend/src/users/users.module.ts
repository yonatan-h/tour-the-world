import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users/users.controller';
import { Users } from './entity/users.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  exports: [UsersService],
  providers: [UsersService]
})
export class UsersModule {}
