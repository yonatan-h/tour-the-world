import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UpdateUser{
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    password:string;
}