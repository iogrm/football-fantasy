import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Column } from 'typeorm';
import { Player } from './Player';
import { Week } from './Week';

@Entity()
export class PlayerStatus {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  score!: number;

  @Column()
  price!: number;

  @ManyToOne(() => Week, { nullable: false })
  week!: Week;

  @ManyToOne(() => Player, { nullable: false })
  player!: Player;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;
}
