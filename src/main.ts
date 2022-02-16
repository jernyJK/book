import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'
import { Logger, ValidationPipe } from '@nestjs/common'
import compression from 'compression'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const port = configService.get<number>('port')
  const logger = new Logger()
  app.use(compression())
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))
  // app.useWebSocketAdapter(new RedisIoAdapter(app))

  const config = new DocumentBuilder()
    .setTitle('Book example')
    .setDescription('The books API description')
    .setVersion('1.0')
    .addTag('books')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(port, () => {
    logger.log(`Application Backend API service listen on port ${port}`)
  })

  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.RMQ,
  //     options: {
  //       urls: ['amqp://localhost:5672'],
  //       queue: 'cats_queue',
  //       queueOptions: {
  //         durable: false,
  //       },
  //     },
  //   },
  // )
  // await app.listen(3000)
}

bootstrap()
