import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment } from './comments.interface';
import { CreateCommentDto } from './dto/comments.dto';
import { UpdateCommentDTO } from './dto/updateComment.dto';

@Injectable()
export class CommentsService {
  comments: Comment[] = [];
  freeId = 0;
  findAll(postId: number) {
    return this.comments.filter((comment) => comment.postId === postId);
  }

  findById(commentId: number) {
    const commentIndex = this.comments.findIndex(
      (comment) => comment.id === commentId,
    );
    if (commentIndex < 0) {
      throw new NotFoundException();
    }
    return this.comments[commentIndex];
  }

  create(newComment: CreateCommentDto) {
    const comment: Comment = {
      id: this.freeId++,
      text: newComment.text,
      postId: newComment.postId,
      createdAt: new Date().toUTCString(),
    };
    this.comments.push(comment);
    return comment;
  }

  update(id: number, newComment: UpdateCommentDTO) {
    const commentIndex = this.comments.findIndex(
      (comment) => comment.id === id,
    );
    if (commentIndex < 0) {
      throw new NotFoundException();
    }
    this.comments[commentIndex].text = newComment.text;
  }

  delete(commentId: number) {
    this.comments = this.comments.filter((comment) => comment.id !== commentId);
  }
}
