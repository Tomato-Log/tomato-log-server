import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UserDataInput {
    @Field(() => String)
    iCloudKeyChain!: string;

    @Field(() => String)
    nickname!: string;

    @Field(() => String, {nullable: true})
    profileImageUrl?: string;
}