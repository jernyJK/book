import { Body, Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello()
  // }

  // @Post()
  // postTodo(@Body('title') title: string, @Body('subttitle') subtitle: string) {
  //   console.log(`title: ${title}, subtitle: ${subtitle}`)
  // }
}
