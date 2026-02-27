import { Controller, Get } from '@nestjs/common';
<<<<<<< HEAD

@Controller()
export class AppController {
  @Get('ping')
  ping() {
    return { message: 'Backend conectado 🚀' };
  }
}
=======
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
>>>>>>> 743b11d50e10de0d8abcac4b1ae09b420b60a52e
