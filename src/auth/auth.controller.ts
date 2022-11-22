import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { AuthUser } from 'src/users/users.decorator';
import { User } from 'src/users/users.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() signUpDto: CreateUserDto) {
    return this.authService.register(signUpDto);
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() signInDto: LoginUserDto) {
    return this.authService.login(signInDto);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  me(@AuthUser() user: User): User {
    return user;
  }
}
