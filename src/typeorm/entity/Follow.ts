import { ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Column, Entity } from 'typeorm';
import { User } from './User';

@Entity()
export class Follow {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  createdAt?: Date;

  @ManyToOne(() => User, { nullable: false })
  follower!: User;

  @ManyToOne(() => User, { nullable: false })
  following!: User;
}
