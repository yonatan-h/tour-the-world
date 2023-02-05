import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/entity/users.entity';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { Comments } from './comments/entity/comments.entity';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    CommentsModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'rooot',
      password: 'rooot',
      database: 'users',
      entities: [Users, Comments],
      synchronize: true,
    }),

    AuthModule,
    ProfileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
