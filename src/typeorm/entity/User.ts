import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { Follow } from './Follow';
import { Like } from './Like';
import { Team } from './Team';

@Entity()
export class User {
  @PrimaryColumn()
  id!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  firstname!: string;

  @Column()
  lastname!: string;

  @Column()
  profileImage?: string;

  @Column()
  country!: string;

  @Column()
  email!: string;

  @Column()
  birthday?: Date;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;

  @OneToOne(() => Team, (team) => team.user)
  team?: Team;

  @OneToMany(() => Follow, (f) => f.follower)
  followers?: Follow[];

  @OneToMany(() => Follow, (f) => f.following)
  followings?: Follow[];

  @OneToMany(() => Like, (l) => l.liker)
  likers?: Like[];

  @OneToMany(() => Like, (l) => l.likee)
  likees?: Like[];
}
