import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@ObjectType()
@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { nullable: true })
  id!: number;

  @Column({ unique: true, name: 'mvdb_id' })
  @Field(() => ID)
  mvdbId!: number;

  @Column()
  @Field(() => String)
  title!: string;

  @Column({ name: 'release_date' })
  @Field(() => String)
  releaseDate!: string;

  @Column({ nullable: true, name: 'poster_path' })
  @Field(() => String, { nullable: true })
  posterPath: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  genre: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  country: string;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  runtime: number;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  overview: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @Field(() => Date, { nullable: true })
  updatedAt!: Date;

  @CreateDateColumn({ name: 'created_at' })
  @Field(() => Date, { nullable: true })
  createdAt!: Date;
}
