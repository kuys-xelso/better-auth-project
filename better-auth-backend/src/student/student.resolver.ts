import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@thallesp/nestjs-better-auth';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => Student)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentService.create(createStudentInput);
  }

  @UseGuards(AuthGuard)
  @Query(() => [Student], { name: 'students' })
  findAll() {
    return this.studentService.findAll();
  }

  @UseGuards(AuthGuard)
  @Query(() => Student, { name: 'student' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.studentService.findOne(id);
  }

  @Mutation(() => Student)
  updateStudent(
    @Args('updateStudentInput') updateStudentInput: UpdateStudentInput,
  ) {
    return this.studentService.update(
      updateStudentInput.id,
      updateStudentInput,
    );
  }

  @Mutation(() => Student)
  removeStudent(@Args('id', { type: () => String }) id: string) {
    return this.studentService.remove(id);
  }
}
