import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Posts } from './posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { Console } from 'console';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Posts[]> {
    return await this.postsRepository.find();
  }

  async findById(id: number): Promise<Posts> {
    const post = await this.postsRepository.findOneBy({ id: id });
    return post;
  }

  async create(post: CreatePostDto, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new HttpException(`Invalid user id`, HttpStatus.UNAUTHORIZED);
    }

    const newpost = await this.postsRepository.create({
      ...post,
      author: { id: user.id },
    });
    this.postsRepository.save(newpost);
  }

  async update(id: number, updateDTO: UpdatePostDto, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new HttpException(`Invalid user id`, HttpStatus.UNAUTHORIZED);
    }
    const post = await this.postsRepository.findOne({
      where: { id: id },
      relations: ['author'],
    });
    if (post.author.id != user.id) {
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
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new HttpException(`Invalid user id`, HttpStatus.UNAUTHORIZED);
    }

    const post = await this.postsRepository.findOne({
      where: { id: id },
      relations: ['author'],
    });
    console.log(post.author, user);
    if (post.author.id != user.id) {
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
}
