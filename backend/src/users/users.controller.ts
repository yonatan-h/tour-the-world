import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUser } from './dto/CreateUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}
    @Get()
    users(){
        return this.userService.userData();
    }

    @Post('create')
    @UsePipes(new ValidationPipe())
    createUser(@Body() userData: CreateUser) {
        return this.userService.createUser(userData);
    }
}
