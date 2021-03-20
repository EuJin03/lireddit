import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  text!: string;

  @Column()
  creatorId: number;

  @Field()
  @Column({ type: "int", default: 0 })
  points!: number;

  @ManyToOne(() => User, user => user.posts)
  creator: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();
}
// Field prop is used to identify which field to expose or hide
// BaseEntity allow us to write Post.find() or Post.insert() etc
// for larger project we can use Repository instead of BaseEntity
