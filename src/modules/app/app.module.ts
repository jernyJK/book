import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from '../users/users.module'
import { ConfigModule } from '@nestjs/config'
import configuration from '../../config/config'
import { MongooseModule } from '@nestjs/mongoose'
import { BooksModule } from '../books/books.module'

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    MongooseModule.forRoot('mongodb://localhost:27017/db'),
    UsersModule,
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
