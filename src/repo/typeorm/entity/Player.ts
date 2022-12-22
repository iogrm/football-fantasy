import { OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Column, Entity } from 'typeorm';
import { PlayerStatus } from './PlayerStatus';
import { Recrutment } from './Recrutment';
import { Replacement } from './Replacement';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  club!: string;

  @Column()
  role!: string;

  @Column()
  webname!: string;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;

  @OneToMany(() => PlayerStatus, (ps) => ps.player)
  playersStatus?: PlayerStatus[];

  @OneToMany(() => Recrutment, (r) => r.player)
  recrutments?: Recrutment[];

  @OneToMany(() => Replacement, (r) => r.oldPlayer)
  oldReplacements?: Replacement[];

  @OneToMany(() => Replacement, (r) => r.newPlayer)
  newReplacements?: Replacement[];
}
