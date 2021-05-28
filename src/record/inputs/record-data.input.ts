import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class RecordDataInput {
  @Field(() => ID)
  mvdbId!: string;

  @Field(() => ID)
  userId!: string;

  @Field(() => Int)
  score!: number;

  @Field(() => Date)
  recordDate: Date;

  @Field(() => String)
  place: string;

  @Field(() => String)
  memorableLine: string;

  @Field(() => String)
  comments: string;
}
