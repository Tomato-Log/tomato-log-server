import { Field, Int, ObjectType } from "@nestjs/graphql";
import { BaseEntity, Column, Entity } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Column({type: 'int', nullable: false})
    @Field(() => Int, {nullable: false})
    something!: number;

    @Column({type: 'int', nullable: false})
    @Field(() => Int, {nullable: false})
    something2!: number;
}