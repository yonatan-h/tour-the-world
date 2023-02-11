import { Injectable, UploadedFiles, Body, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesInterceptor } from '@nestjs/platform-express';
import { json, text } from 'stream/consumers';
import { Repository } from 'typeorm';
import { FileImageInput } from './dto/FileImageInput.dto';
import { CountryData } from './entity/CountryData.entity';
import { UpdateFile } from './dto/UpdateFile.dto';

@Injectable()
export class CountryInfoService {
    constructor(
        @InjectRepository(CountryData)
        private data: Repository<CountryData>){}
    
    
    get(): Promise<CountryData[]>{
        return this.data.find()
    }
    saveFile(@Body()textDescription, fileData: FileImageInput){
        console.log(fileData);
        const imagearr = this.parseImages(fileData);
        const something = {
            text: textDescription.text,
            country: textDescription.country,
            profilefilename: imagearr.shift(),
            additional_pics: imagearr.join(",")
        };
        return this.data.save(something);
    }

    parseImages(images: any){
        const imageName = []
        for (const i of images){
            imageName.push(i.filename);
        }
        return imageName;
    }

    update(@Body() text: UpdateFile, id: number){
        console.log(text);
        return this.data.update(id, text);
    }
}
