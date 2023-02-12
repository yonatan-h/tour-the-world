import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/entity/users.entity';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { Comments } from './comments/entity/comments.entity';
import { CommentsModule } from './comments/comments.module';
import { CountryInfoModule } from './country_info/country_info.module';
import { CountryData } from './country_info/entity/CountryData.entity';

@Module({
  imports: [
    CommentsModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'primequantuM4',
      database: 'userdb',
      entities: [Users, Comments, CountryData],
      synchronize: true,
    }),

    AuthModule,
    ProfileModule,
    CountryInfoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
