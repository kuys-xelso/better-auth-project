import { gql } from "./generated";

export const CREATE_STUDENT = gql(`
  mutation createStudent($createStudentInput: CreateStudentInput!) {
    createStudent(createStudentInput: $createStudentInput) {
      firstName
    }
  }
`);
