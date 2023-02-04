import { Body, Injectable } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUser } from './dtos/UpdateUser.dto';
@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
    ){}

    get(): Promise<Users[]> {
        return this.userRepository.find();
    }

    create(@Body() createUser: CreateUserDto){
        return this.userRepository.save(createUser);
    }
    updateUser(@Body() username: UpdateUser, id: number){
        return this.userRepository.update(id, username);
    }
    showSpecificUser(id: number){
        return this.userRepository.findOne({ where: { id } });
    }
    showSpecificUserByEmail(email: string){
        return this.userRepository.findOne({ where: { email }});
    }
    deleteUser(id: number){
        return this.userRepository.delete(id);
    }
}
