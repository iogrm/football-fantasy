import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { Week } from './Week';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;

  @ManyToOne(() => User, { nullable: false })
  liker!: Week;

  @ManyToOne(() => User, { nullable: false })
  likee!: Week;

  @ManyToOne(() => Week, { nullable: false })
  week!: Week;
}
