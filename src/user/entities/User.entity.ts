import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Moment } from "moment";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id!: number;

    @Column({type: 'int', nullable: false})
    @Field(() => Int, {nullable: false})
    something!: number;

    @Column({type: 'int', nullable: false})
    @Field(() => Int, {nullable: false})
    something2!: number;

    @Column({type: 'boolean', nullable: false, default: true, name: 'is_active'})
    @Field(() => Boolean, {nullable: false})
    isActive!: boolean;

    @CreateDateColumn({name: 'created_at'})
    @Field(() => String) // TODO: graphql 에 moment 관련 custom scalar 만들기?
    createdAt!: Moment;
}