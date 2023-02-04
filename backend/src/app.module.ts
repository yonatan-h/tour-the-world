import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'primequantuM4',
      database: 'authentication',
      entities: [User],
      synchronize: true,
    }), UsersModule
  ],
  controllers: []
})
export class AppModule {
  constructor(private dataSource: DataSource){}
}
