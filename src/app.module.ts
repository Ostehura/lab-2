import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsController } from './comments/comments.controller';
import { CommentsModule } from './comments/comments.module';
import { CommentsService } from './comments/comments.service';
import { PostModule } from './posts/post.module';
import { PostsService } from './posts/post.service';
import { PostsController } from './posts/posts.controller';

@Module({
  imports: [PostModule, CommentsModule],
  controllers: [AppController, PostsController, CommentsController],
  providers: [AppService, PostsService, CommentsService],
})
export class AppModule {}
