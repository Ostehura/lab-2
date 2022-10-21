import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comments } from './comments.entity';
import { Comment } from './comments.interface';
import { CreateCommentDto } from './dto/comments.dto';
import { UpdateCommentDTO } from './dto/updateComment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private readonly commentsRepository: Repository<Comments>, // private readonly postsRepository: Repository<Posts>,
  ) {}

  // findAll(postId: number, queryString: string) {
  //   return this.commentsRepository.
  //   // .filte(
  //   //   (comment) =>
  //   //     comment.postId === postId && comment.text.includes(queryString),
  //   // );
  // }

  findById(commentId: number) {
    const comment = this.commentsRepository.findOneBy({ id: commentId });
    if (!comment) {
      throw new NotFoundException();
    }
    return comment;
  }

  async create(createDTO: CreateCommentDto) {
    // const post = await this.postsRepository.findOneBy({ id: createDTO.postId });

    // if (!post) {
    //   throw new HttpException(
    //     `Post with given id = ${createDTO.postId} not found!`,
    //     HttpStatus.NOT_FOUND,
    //   );
    // }

    const comment = this.commentsRepository.create({
      text: createDTO.text,
    });

    return this.commentsRepository.save(comment);
  }

  async update(id: number, updateDTO: UpdateCommentDTO) {
    const comment = await this.commentsRepository.findOneBy({ id: id });
    if (!comment) {
      throw new HttpException(
        `Comment with given id = ${id} not found!`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.commentsRepository.save({
      ...comment,
      ...updateDTO,
      updatedAt: new Date().toISOString(),
    });
  }

  async delete(id: number) {
    await this.commentsRepository.delete({ id: id });
  }
}
