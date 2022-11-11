import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUserTest();
  }

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }
}
