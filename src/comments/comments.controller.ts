import { CommentsService } from './comments.service';
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Delete,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/comments.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Get()
  findAll(@Query('postId', new ParseIntPipe()) postId: number) {
    return this.commentService.findAll(postId);
  }

  @Get(':id')
  getById(@Param('id', new ParseIntPipe()) id: number) {
    return this.commentService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateCommentDto) {
    return this.commentService.create(body);
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.commentService.delete(id);
  }
}
