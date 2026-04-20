import { Injectable } from '@nestjs/common';
import { CreateStrandInput } from './dto/create-strand.input';
import { UpdateStrandInput } from './dto/update-strand.input';

@Injectable()
export class StrandsService {
  create(createStrandInput: CreateStrandInput) {
    return 'This action adds a new strand';
  }

  findAll() {
    return `This action returns all strands`;
  }

  findOne(id: number) {
    return `This action returns a #${id} strand`;
  }

  update(id: number, updateStrandInput: UpdateStrandInput) {
    return `This action updates a #${id} strand`;
  }

  remove(id: number) {
    return `This action removes a #${id} strand`;
  }
}
