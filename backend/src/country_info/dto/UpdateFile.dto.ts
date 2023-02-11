import { IsNotEmpty } from "class-validator";

export class UpdateFile{
    @IsNotEmpty()
    text: string;
}