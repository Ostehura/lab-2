import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Posts } from './posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { retry } from 'rxjs';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
  ) {}

  async findAll(): Promise<Posts[]> {
    return await this.postsRepository.find();
  }

  async findById(id: number): Promise<Posts> {
    const post = await this.postsRepository.findOne({
      where: { id: id },
      relations: { author: true },
    });
    return post;
  }

  async create(post: CreatePostDto, authorUsername: string) {
    const newpost = await this.postsRepository.create({
      description: post.description,
      title: post.title,
      author: { username: authorUsername },
    });
    this.postsRepository.save(newpost);
  }

  async update(id: number, updateDTO: UpdatePostDto, userId: number) {
    const post = await this.postsRepository.findOne({
      where: { id: id },
      relations: ['author'],
    });
    if (post.author.id != userId) {
      throw new HttpException(`Invalid user id`, HttpStatus.FORBIDDEN);
    }

    if (!post) {
      throw new HttpException(
        `Post with given id = ${id} not found!`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.postsRepository.save({
      ...post,
      ...updateDTO,
      updatedAt: new Date().toISOString(),
    });
  }

  async delete(id: number, userId: number) {
    const post = await this.postsRepository.findOne({
      where: { id: id },
      relations: ['author'],
    });

    if (post.author.id != userId) {
      throw new HttpException(`Invalid user id`, HttpStatus.FORBIDDEN);
    }

    if (!post) {
      throw new HttpException(
        `Post with given id = ${id} not found!`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.postsRepository.delete({ id: id });
  }

  async getAllComments(postId: number) {
    return await this.postsRepository.findOne({
      where: { id: postId },
      relations: { comments: true },
    });
  }
}
