import { Module } from '@nestjs/common';
import { StrandsService } from './strands.service';
import { StrandsResolver } from './strands.resolver';

@Module({
  providers: [StrandsResolver, StrandsService],
})
export class StrandsModule {}
