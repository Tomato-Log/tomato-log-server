import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column()
  @Field(() => String)
  title!: string;

  @Column()
  @Field(() => String)
  releaseDate!: string;

  @Column({ nullable: true })
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
}
