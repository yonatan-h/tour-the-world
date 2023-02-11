import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Param,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUser } from 'src/users/dtos/UpdateUser.dto';
import { UsersService } from 'src/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userHandler: UsersService) {}
  @Get()
  getUsers(@Query() sortBy: string) {
    return this.userHandler.get();
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  createUser(@Body() userData: CreateUserDto) {
    console.log(userData);
    return this.userHandler.create(userData);
  }

  @Patch(':id')
  updateUser(@Body() userData: UpdateUser, @Param() id: number) {
    return this.userHandler.updateUser(userData, id);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userHandler.showSpecificUser(id);
  }

  @Delete('/:id')
  deleteUser(@Param() id: number) {
    return this.userHandler.deleteUser(id);
  }
}
