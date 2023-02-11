import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express/multer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryInfoController } from './country_info.controller';
import { CountryInfoService } from './country_info.service';
import { CountryData } from './entity/CountryData.entity';

@Module({
  controllers: [CountryInfoController],
  providers: [CountryInfoService],
  imports: [
    MulterModule.register({ dest: './uploads' }),
    TypeOrmModule.forFeature([CountryData])
  ]
})
export class CountryInfoModule {}
