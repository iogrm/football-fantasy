import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Player } from './Player';
import { Team } from './Team';

@Entity()
export class Recrutment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  position!: number;

  @Column()
  isPlaying!: boolean;

  @Column()
  expiredAt?: Date;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;

  @ManyToOne(() => Player, { nullable: false })
  player!: Player;

  @ManyToOne(() => Team, { nullable: false })
  team!: Team;
}
