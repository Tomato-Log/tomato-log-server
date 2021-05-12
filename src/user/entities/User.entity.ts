import { Field, ID, ObjectType } from "@nestjs/graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id!: number;

    // TODO: iCloud key chain 으로 확정되면 uuid 로 바꿔도 될듯(UserDataInput 도).
    @Column({type: 'varchar', nullable: false, unique: true, name: 'i_cloud_key_chain'})
    @Field(() => String)
    iCloudKeyChain!: string;

    @Column({type: 'varchar', nullable: false, unique: true})
    @Field(() => String)
    nickname!: string;

    @UpdateDateColumn({name: 'updated_at'})
    @Field(() => Date)
    updatedAt!: Date;

    @CreateDateColumn({name: 'created_at'})
    @Field(() => Date)
    createdAt!: Date;
}