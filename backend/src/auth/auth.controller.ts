import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
<<<<<<< HEAD
=======
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
>>>>>>> 743b11d50e10de0d8abcac4b1ae09b420b60a52e

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
<<<<<<< HEAD
  register(@Body() body: any) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body);
=======
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
>>>>>>> 743b11d50e10de0d8abcac4b1ae09b420b60a52e
  }
}