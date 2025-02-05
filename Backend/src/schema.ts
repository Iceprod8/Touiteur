import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    doctors(specialities: [Speciality!]): [Doctor!]!
    getUser: [User]!
    getUserById(id: String!): GetUserByIdResponse
    getUserByName(username: String!): GetUserByNameResponse
  }

  type Mutation {
    createUser(username: String!, password: String!): CreateUserResponse
    signIn(username: String!, password: String!): SignInUserResponse
  }

  type User {
    id: ID!
    username: String!
  }

  type GetUserByIdResponse {
    code: Int!
    success: Boolean!
    message: String!
    user: User
  }

  type GetUserByNameResponse {
    code: Int!
    success: Boolean!
    message: String!
    user: User
  }

  type CreateUserResponse {
    code: Int!
    success: Boolean!
    message: String!
    user: User
  }

  type SignInUserResponse {
    code: Int!
    success: Boolean!
    message: String!
    token: String
  }

  type Doctor {
    name: String
    speciality: Speciality
  }

  enum Speciality {
    PSYCHOLOGIST
    OPHTALMOLOGIST
  }
`;
