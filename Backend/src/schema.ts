import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    getUsers: [User]!
    getUserById(id: ID!): GetUserByIdResponse
    getUserByName(username: String!): GetUserByNameResponse
    getPosts: [Post]!
    getPostById(id: ID!): GetPostByIdResponse
    getCommentsByPostId(postId: ID!): [Comment!]!
  }

  type Mutation {
    createUser(username: String!, password: String!): CreateUserResponse
    signIn(username: String!, password: String!): SignInUserResponse
    createPost(content: String!, authorId: ID!): CreatePostResponse
    deletePost(id: ID!): DeletePostResponse
    updatePost(id: ID!, content: String!): UpdatePostResponse
    createComment(
      content: String!
      authorId: ID!
      postId: ID!
    ): CreateCommentResponse
    deleteComment(id: ID!): DeleteCommentResponse
    likePost(postId: ID!, userId: ID!): LikePostResponse
    likeComment(commentId: ID!, userId: ID!): LikeCommentResponse
  }

  type User {
    id: ID!
    username: String!
    posts: [Post!]!
    likedPosts: [Post!]!
    comments: [Comment!]!
    likedComments: [Comment!]!
  }

  type Post {
    id: ID!
    content: String!
    authorId: ID!
    author: User!
    comments: [Comment!]!
    likedBy: [User!]!
  }

  type Comment {
    id: ID!
    content: String!
    author: User!
    post: Post!
    likedBy: [User!]!
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

  type GetPostByIdResponse {
    code: Int!
    success: Boolean!
    message: String!
    post: Post
  }

  type CreatePostResponse {
    code: Int!
    success: Boolean!
    message: String!
    post: Post
  }

  type DeletePostResponse {
    code: Int!
    success: Boolean!
    message: String!
  }

  type UpdatePostResponse {
    code: Int!
    success: Boolean!
    message: String!
    post: Post
  }

  type CreateCommentResponse {
    code: Int!
    success: Boolean!
    message: String!
    comment: Comment
  }

  type DeleteCommentResponse {
    code: Int!
    success: Boolean!
    message: String!
  }

  type LikePostResponse {
    code: Int!
    success: Boolean!
    message: String!
    post: Post
  }

  type LikeCommentResponse {
    code: Int!
    success: Boolean!
    message: String!
    comment: Comment
  }
`;
