import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StrandsService } from './strands.service';
import { Strand } from './entities/strand.entity';
import { CreateStrandInput } from './dto/create-strand.input';
import { UpdateStrandInput } from './dto/update-strand.input';

@Resolver(() => Strand)
export class StrandsResolver {
  constructor(private readonly strandsService: StrandsService) {}

  @Mutation(() => Strand)
  createStrand(@Args('createStrandInput') createStrandInput: CreateStrandInput) {
    return this.strandsService.create(createStrandInput);
  }

  @Query(() => [Strand], { name: 'strands' })
  findAll() {
    return this.strandsService.findAll();
  }

  @Query(() => Strand, { name: 'strand' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.strandsService.findOne(id);
  }

  @Mutation(() => Strand)
  updateStrand(@Args('updateStrandInput') updateStrandInput: UpdateStrandInput) {
    return this.strandsService.update(updateStrandInput.id, updateStrandInput);
  }

  @Mutation(() => Strand)
  removeStrand(@Args('id', { type: () => Int }) id: number) {
    return this.strandsService.remove(id);
  }
}
