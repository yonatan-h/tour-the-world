import { IsNotEmpty } from "class-validator";

export class FileImageInput{
    @IsNotEmpty()
    profilefilename: string;

    @IsNotEmpty()
    text: string;

    @IsNotEmpty()
    country: string;

    additional_pics: string;
}