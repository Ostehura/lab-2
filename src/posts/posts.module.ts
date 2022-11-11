import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './posts.entity';
import { Comments } from 'src/comments/comments.entity';
import { User } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Posts, Comments, User])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
