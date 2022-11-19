import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Render,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @Render('post')
  async getById(@Param('id', new ParseIntPipe()) id: number) {
    const post = await this.postsService.findById(id);
    const comments = (await this.postsService.getAllComments(post.id)).comments;
    return {
      meta: {
        title: post.title,
        description: post.description,
        keywords: 'post',
      },
      message: 'Post page',
      post,
      comments,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreatePostDto, @Req() req: any) {
    return this.postsService.create(body, req.user.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdatePostDto,
    @Req() req: any,
  ) {
    return this.postsService.update(id, body, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id', new ParseIntPipe()) id: number, @Req() req: any) {
    return this.postsService.delete(id, req.user.id);
  }
}
