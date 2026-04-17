import { Injectable } from '@nestjs/common';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  create(createStudentInput: CreateStudentInput) {
    return this.prisma.student.create({
      data: createStudentInput,
    });
  }

  findAll() {
    return this.prisma.student.findMany();
  }

  findOne(id: string) {
    return this.prisma.student.findUnique({
      where: { id },
    });
  }

  update(id: string, updateStudentInput: UpdateStudentInput) {
    const { id: _, ...data } = updateStudentInput;
    return this.prisma.student.update({
      where: { id },
      data: data,
    });
  }

  remove(id: string) {
    return this.prisma.student.delete({
      where: { id },
    });
  }
}
