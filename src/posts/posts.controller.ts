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
  getById(@Param('id', new ParseIntPipe()) id: number) {
    return this.postsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreatePostDto) {
    return this.postsService.create(body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdatePostDto,
  ) {
    return this.postsService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.postsService.delete(id);
  }
}
