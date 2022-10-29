import { Comments } from 'src/comments/comments.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'text', length: 140 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: false, name: 'active' })
  isActive: boolean;

  @Column({ type: 'datetime', default: new Date().toString() })
  createdAt: string;

  @Column({ type: 'datetime', nullable: true })
  updatedAt: string;

  @Column({ type: 'datetime', nullable: true })
  deletedAt: string;

  @OneToMany(() => Comments, (comment) => comment.post)
  comments: Comments[];
}
