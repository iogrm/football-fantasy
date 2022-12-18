import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Replacement } from './Replacement';
import { PlayerStatus } from './PlayerStatus';
import { Like } from './Like';

@Entity()
export class Week {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  number!: number;

  @Column()
  endDate!: Date;

  @Column()
  deadlineDate!: Date;

  @Column()
  isCurrent!: boolean;

  @Column()
  isNext!: boolean;

  @Column()
  isPrevious!: boolean;

  @OneToMany(() => PlayerStatus, (p) => p.week)
  playersStatus?: PlayerStatus[];

  @OneToMany(() => Replacement, (r) => r.week)
  replacements?: Replacement[];

  @OneToMany(() => Like, (l) => l.week)
  likes?: Like[];
}
