import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateStudentInput {
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
}
