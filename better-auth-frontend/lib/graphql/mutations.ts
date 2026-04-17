import { gql } from "./generated";

export const CREATE_STUDENT = gql(`
  mutation createStudent($createStudentInput: CreateStudentInput!) {
    createStudent(createStudentInput: $createStudentInput) {
      firstName
    }
  }
`);

export const DELETE_STUDENT_BY_ID = gql(`
  mutation RemoveStudent($id: String!) {
    removeStudent(id: $id) {
      id
    }
  }
`);
