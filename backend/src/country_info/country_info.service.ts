import {
  Injectable,
  UploadedFiles,
  Body,
  UseInterceptors,
} from '@nestjs/common';
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
    private data: Repository<CountryData>,
  ) {}

  async get(): Promise<any> {
    const countries = await this.data.find();
    const withSplittedImages = countries.map((country) => {
      return {
        id: country.id,
        country: country.country,
        profilefilename: country.profilefilename,
        additional_pics: country.additional_pics.split(','),
        text: country.text,
      };
    });
    console.log(withSplittedImages);
    return withSplittedImages;
  }
  saveFile(@Body() textDescription, fileData: FileImageInput) {
    const imagearr = this.parseImages(fileData);
    const profimage = imagearr.shift();
    const additional_image = [];
    for (let i = 0; i < 3; i++) {
      additional_image.push(imagearr.shift());
    }
    const something = {
      text: textDescription.text,
      country: textDescription.country,
      profilefilename: profimage,
      additional_pics: additional_image.join(','),
      food_images: imagearr.join(','),
    };
    return this.data.save(something);
  }

  parseImages(images: any) {
    const imageName = [];
    for (const i of images) {
      imageName.push(i.filename);
    }
    return imageName;
  }

  async getCountryByName(country: string) {
    //CHANGED
    return (await this.data.findOne({ where: { country } })) ?? {};
  }
  update(@Body() text: UpdateFile, id: number) {
    return this.data.update(id, text);
  }
  deleteCountryInfo(id: number) {
    return this.data.delete(id);
  }
}
