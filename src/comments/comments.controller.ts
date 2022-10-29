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
  Put,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/comments.dto';
import { UpdateCommentDTO } from './dto/updateComment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Get()
  findAll(
    @Query('postId', new ParseIntPipe()) postId: number,
    @Query('qString') qString: string,
  ) {
    return this.commentService.findAll(postId, qString);
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

  @Put(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdateCommentDTO,
  ) {
    return this.commentService.update(id, body);
  }
}
