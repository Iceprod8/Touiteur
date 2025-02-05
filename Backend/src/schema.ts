import gql from "graphql-tag";

export const typeDefs = gql`
  type Mutation {
    createUser(username: String!, password: String!): CreateUserResponse
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
`;
