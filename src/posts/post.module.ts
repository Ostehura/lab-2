import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './post.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostModule {}
