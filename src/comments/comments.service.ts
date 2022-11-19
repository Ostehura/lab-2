import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from 'src/posts/posts.entity';
import { User } from 'src/users/users.entity';
import { Like, Repository } from 'typeorm';
import { Comments } from './comments.entity';
import { CreateCommentDto } from './dto/comments.dto';
import { UpdateCommentDTO } from './dto/updateComment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private readonly commentsRepository: Repository<Comments>,
  ) {}

  async findAll(postId: number, queryString: string, order: string) {
    return await this.commentsRepository.find({
      where: {
        post: { id: postId },
        text: Like(`%${queryString}%`),
      },
      order: { createdAt: order == 'asc' ? 'asc' : 'desc' },
    });
  }

  async findById(commentId: number) {
    const comment = await this.commentsRepository.findOneBy({ id: commentId });
    if (!comment) {
      throw new NotFoundException();
    }
    return comment;
  }

  async create(createDTO: CreateCommentDto, userId: number) {
    const comment = this.commentsRepository.create({
      post: { id: createDTO.postId },
      author: { id: userId },
      text: createDTO.text,
    });

    return await this.commentsRepository.save(comment);
  }

  async update(id: number, updateDTO: UpdateCommentDTO, userId: number) {
    const comment = await this.commentsRepository.findOne({
      where: { id: id },
      relations: ['author'],
    });
    if (!comment) {
      throw new HttpException(
        `Comment with given id = ${id} not found!`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (comment.author.id != userId) {
      throw new HttpException(
        `Only authors can update comments`,
        HttpStatus.FORBIDDEN,
      );
    }

    return this.commentsRepository.save({
      ...comment,
      ...updateDTO,
      updatedAt: new Date().toISOString(),
    });
  }

  async delete(id: number, userId: number) {
    const comment = await this.commentsRepository.findOne({
      where: { id: id },
      relations: ['author'],
    });
    if (!comment) {
      throw new HttpException(
        `Comment with given id = ${id} not found!`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (comment.author.id != userId) {
      throw new HttpException(
        `Only authors can update comments`,
        HttpStatus.FORBIDDEN,
      );
    }
    await this.commentsRepository.delete({ id: id });
  }
}
