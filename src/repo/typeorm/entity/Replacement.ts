import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Player } from './Player';
import { Team } from './Team';
import { Week } from './Week';

@Entity()
export class Replacement {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Week, { nullable: false })
  week!: Week;

  @ManyToOne(() => Team, { nullable: false })
  team!: Team;

  @ManyToOne(() => Player, { nullable: false })
  oldPlayer!: Player;

  @ManyToOne(() => Player, { nullable: false })
  newPlayer!: Player;

  @Column()
  createdAt?: Date;

  @Column()
  position!: number;
}
