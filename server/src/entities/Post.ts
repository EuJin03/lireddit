import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));
@ObjectType()
@Entity()
export class Post {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field()
  @Property({ type: "text" })
  title!: string;
}

// Field prop is used to identify which field to expose or hide
