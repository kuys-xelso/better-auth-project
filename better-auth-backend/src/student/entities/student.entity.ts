import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Student {
  @Field(() => String)
  id: string;

  @Field(() => String)
  lrn: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String, { nullable: true })
  middleName?: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  contactNo: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
