import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Recrutment } from './Recrutment';
import { Replacement } from './Replacement';
import { User } from './User';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  credit!: number;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;

  @OneToOne((type) => User)
  @JoinColumn()
  user!: User;

  @OneToMany(() => Recrutment, (p) => p.team)
  recrutments?: Recrutment[];

  @OneToMany(() => Replacement, (r) => r.team)
  replacements?: Replacement[];
}
