import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUser } from './dto/CreateUser.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    ){}

    userData(): Promise<User[]>{
        return this.usersRepository.find();
    }

    createUser(@Body() createUser: CreateUser){
        return this.usersRepository.save(createUser);
    }
}
