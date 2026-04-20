import { CreateStrandInput } from './create-strand.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateStrandInput extends PartialType(CreateStrandInput) {
  @Field(() => Int)
  id: number;
}
