import { Comments } from 'src/comments/comments.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { User } from 'src/users/users.entity';

@Entity()
export class Posts extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'text', length: 140 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'datetime', default: new Date().toString() })
  createdAt: string;

  @Column({ type: 'datetime', nullable: true })
  updatedAt: string;

  @Column({ type: 'datetime', nullable: true })
  deletedAt: string;

  @OneToMany(() => Comments, (comment) => comment.post)
  comments: Comments[];

  @ManyToOne(() => User, (user) => user.posts)
  author: User;
}
