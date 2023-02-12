import { Controller, UseInterceptors, UploadedFiles } from '@nestjs/common';
import {
  Post,
  Get,
  Patch,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import {
  Body,
  Param,
  UploadedFile,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Observable, of } from 'rxjs';
import { text } from 'stream/consumers';
import { CountryInfoService } from './country_info.service';
import { FileImageInput } from './dto/FileImageInput.dto';
import { UpdateFile } from './dto/UpdateFile.dto';
import { CountryData } from './entity/CountryData.entity';

export const storage = {
  storage: diskStorage({
    destination: './uploads/images',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
      callback(null, filename);
    },
  }),
};
export const imageStorage = {
  storage: diskStorage({
    destination: './uploads/images/additionalImages',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
      callback(null, filename);
    },
  }),
};
@Controller('country-info')
export class CountryInfoController {
  constructor(private countryService: CountryInfoService) {}

  @Get()
  async getImages() {
    return await this.countryService.get();
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images', 5, imageStorage))
  handleProfileDescriptionUpload(
    @UploadedFiles() images,
    @Body() textDescription,
    dto,
  ) {
    return this.countryService.saveFile(textDescription, images);
  }

  @Patch(':id')
  update(@Body() userData: UpdateFile, @Param() id: number) {
    return this.countryService.update(userData, id);
  }
}
