import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUser{

    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    password: string;


}