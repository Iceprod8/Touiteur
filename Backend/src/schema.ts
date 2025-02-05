import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    doctors(specialities: [Speciality!]): [Doctor!]!
  }

  type Mutation {
    createUser(username: String!, password: String!): CreateUserResponse
    signIn(username: String!, password: String!): SignInUserResponse
  }

  type User {
    id: ID!
    username: String!
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
