import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.interface';

@Injectable()
export class PostsService {
  posts: Post[] = [];

  findAll(page: number, elementsPerPage: number) {
    this.posts.slice(page * elementsPerPage, (page + 1) * elementsPerPage);
  }

  findById(id: number): Post {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex < 0) {
      throw new NotFoundException();
    }
    return this.posts[postIndex];
  }

  create(post: CreatePostDto) {
    const newPost: Post = {
      id: this.posts.length,
      title: post.title,
      description: post.description,
      createdAt: new Date().toUTCString(),
    };
    this.posts.push(newPost);
  }

  update(postId: number, post: Post) {
    const postIndex = this.posts.findIndex((post) => post.id === postId);
    if (postIndex < 0) {
      throw new NotFoundException();
    }
    this.posts[postIndex] = {
      id: postIndex,
      title: post.title,
      description: post.description,
      createdAt: post.createdAt,
    };
  }

  delete(id: number) {
    this.posts = this.posts.filter((post) => post.id !== id);
  }
}
