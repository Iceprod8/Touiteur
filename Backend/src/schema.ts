import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    getUsers: [User]!
    getUserById(id: ID!): CGUserResponse
    getUserByName(username: String!): CGUserResponse
    getPosts: [Post]!
    getPostById(id: ID!): CGUDPostResponse
    getCommentsByPostId(postId: ID!): [Comment!]!
  }

  type Mutation {
    createUser(username: String!, password: String!): CGUserResponse
    signIn(username: String!, password: String!): SignInUserResponse
    createPost(content: String!, authorId: ID!): CGUDPostResponse
    deletePost(id: ID!): CGUDPostResponse
    updatePost(id: ID!, content: String!): CGUDPostResponse
  }

  type User {
    id: ID!
    username: String!
    posts: [Post!]
    likedPosts: [Post!]
    comments: [Comment!]
    likedComments: [Comment!]
  }

  type Post {
    id: ID!
    content: String!
    authorId: ID!
    author: User!
    comments: [Comment!]
    likedBy: [User!]
  }

  type Comment {
    id: ID!
    content: String!
    author: User!
    post: Post!
    likedBy: [User!]!
  }

  type CGUserResponse {
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

  type CGUDPostResponse {
    code: Int!
    success: Boolean!
    message: String!
    post: Post
  }
`;
