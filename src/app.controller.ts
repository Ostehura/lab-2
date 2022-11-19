import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { PostsService } from './posts/posts.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly postsService: PostsService,
  ) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  @Render('index')
  async root() {
    const posts = await this.postsService.findAll();
    return {
      meta: {
        title: 'Page - Index',
        description: 'Very interesting description',
        keywords: 'lab meme i don`t know what to add',
        author: '~(0)-(0)~',
      },
      message: 'Main page',
      posts,
    };
  }

  @Get('/about')
  @Render('about')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getAbout() {}
}
