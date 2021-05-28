import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Movie } from 'src/movie/entities/Movie.entity';
import { User } from 'src/user/entities/User.entity';

@ObjectType()
@Entity()
export class Record extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ name: 'score', nullable: false })
  @Field(() => Int)
  score!: number;

  @Column({ name: 'record_date', nullable: true })
  @Field(() => Date, { nullable: true })
  recordDate: Date;

  @Column({ name: 'place', nullable: true })
  @Field(() => String, { nullable: true })
  place: string;

  @Column({ name: 'memorable_line', nullable: true })
  @Field(() => String, { nullable: true })
  memorableLine: string;

  @Column({ name: 'comments', nullable: true })
  @Field(() => String, { nullable: true })
  comments: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @Field(() => Date)
  updatedAt!: Date;

  @CreateDateColumn({ name: 'created_at' })
  @Field(() => Date)
  createdAt!: Date;

  @ManyToOne(() => Movie)
  movie: Movie;

  @ManyToOne(() => User, (user) => user.records)
  user: User;
}
