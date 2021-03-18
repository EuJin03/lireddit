import { Field, InputType } from "type-graphql";

// inputType use for arguments, ObjectType use for return object

@InputType()
export class UsernamePasswordInput {
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  password: string;
}
