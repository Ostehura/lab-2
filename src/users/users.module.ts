import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from 'src/posts/posts.entity';
import { UserController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Posts])],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UserModule {}
