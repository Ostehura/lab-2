import { Comments } from 'src/comments/comments.entity';
import { User } from 'src/users/users.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'text', default: '', length: 50 })
  telegram: string;

  @Column({ type: 'text', default: '', length: 50 })
  twitter: string;

  @Column({ type: 'text', default: '', length: 50 })
  instagram: string;

  @Column({ type: 'text', default: '', length: 50 })
  aboutMe: string;

  @Column({ type: 'datetime', nullable: true })
  bithday: Date;
}
