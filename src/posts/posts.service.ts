import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Posts } from './posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
  ) {}

  // async findAll(): Promise<Posts[]> {
  //   return //await this.postsRepository.find();
  // }

  async findById(id: number): Promise<Posts> {
    const post = await this.postsRepository.findOneBy({ id: id });
    return post;
  }

  async create(post: CreatePostDto) {
    const newpost = await this.postsRepository.create({
      ...post,
    });
    this.postsRepository.save(newpost);
  }

  async update(id: number, updateDTO: UpdatePostDto) {
    const post = await this.postsRepository.findOneBy({ id: id });

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

  async delete(id: number) {
    await this.postsRepository.delete({ id: id });
  }
}
