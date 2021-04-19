import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UserDataInput {
    @Field(() => Int)
    something!: number;

    @Field(() => Int)
    something2!: number;
}