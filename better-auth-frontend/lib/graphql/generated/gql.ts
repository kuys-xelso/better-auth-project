/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation createStudent($createStudentInput: CreateStudentInput!) {\n    createStudent(createStudentInput: $createStudentInput) {\n      firstName\n    }\n  }\n": typeof types.CreateStudentDocument,
    "\n  mutation RemoveStudent($id: String!) {\n    removeStudent(id: $id) {\n      id\n    }\n  }\n": typeof types.RemoveStudentDocument,
    "\n  mutation UpdateStudent($updateStudentInput: UpdateStudentInput!) {\n    updateStudent(updateStudentInput: $updateStudentInput) {\n      id\n    }\n  }\n": typeof types.UpdateStudentDocument,
    "\n  query GetStudents {\n    students {\n      id\n      lrn\n      firstName\n      middleName\n      lastName\n      email\n      contactNo\n    }\n  }\n": typeof types.GetStudentsDocument,
};
const documents: Documents = {
    "\n  mutation createStudent($createStudentInput: CreateStudentInput!) {\n    createStudent(createStudentInput: $createStudentInput) {\n      firstName\n    }\n  }\n": types.CreateStudentDocument,
    "\n  mutation RemoveStudent($id: String!) {\n    removeStudent(id: $id) {\n      id\n    }\n  }\n": types.RemoveStudentDocument,
    "\n  mutation UpdateStudent($updateStudentInput: UpdateStudentInput!) {\n    updateStudent(updateStudentInput: $updateStudentInput) {\n      id\n    }\n  }\n": types.UpdateStudentDocument,
    "\n  query GetStudents {\n    students {\n      id\n      lrn\n      firstName\n      middleName\n      lastName\n      email\n      contactNo\n    }\n  }\n": types.GetStudentsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createStudent($createStudentInput: CreateStudentInput!) {\n    createStudent(createStudentInput: $createStudentInput) {\n      firstName\n    }\n  }\n"): (typeof documents)["\n  mutation createStudent($createStudentInput: CreateStudentInput!) {\n    createStudent(createStudentInput: $createStudentInput) {\n      firstName\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RemoveStudent($id: String!) {\n    removeStudent(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveStudent($id: String!) {\n    removeStudent(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateStudent($updateStudentInput: UpdateStudentInput!) {\n    updateStudent(updateStudentInput: $updateStudentInput) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateStudent($updateStudentInput: UpdateStudentInput!) {\n    updateStudent(updateStudentInput: $updateStudentInput) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetStudents {\n    students {\n      id\n      lrn\n      firstName\n      middleName\n      lastName\n      email\n      contactNo\n    }\n  }\n"): (typeof documents)["\n  query GetStudents {\n    students {\n      id\n      lrn\n      firstName\n      middleName\n      lastName\n      email\n      contactNo\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;