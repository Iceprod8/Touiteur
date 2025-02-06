import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    getUsers: [User]!
    getUserById(id: ID!): CRUserResponse
    getUserByName(username: String!): CRUserResponse

    getPosts: CRUDPostsResponse
    getPostById(id: ID!): CRUDPostResponse
    getPostsUser(userId: ID!): CRUDPostsResponse

    getComments: CRUDCommentsResponse
    getCommentById(id: ID!): CRUDCommentResponse
    getCommentsUser(userId: ID!): CRUDCommentResponse
    getCommentsPost(postId: ID!): CRUDCommentResponse
  }

  type Mutation {
    createUser(username: String!, password: String!): CRUserResponse
    updateUser(username: String!, password: String!): CRUserResponse
    signIn(username: String!, password: String!): SignInUserResponse

    createPost(content: String!, authorId: ID!): CRUDPostResponse
    deletePost(id: ID!): CRUDPostResponse
    updatePost(id: ID!, content: String!): CRUDPostResponse

    createComment(
      content: String!
      authorId: ID!
      postId: ID!
    ): CRUDCommentResponse
    deleteComment(id: ID!): CRUDCommentResponse
    updateComment(id: ID!, content: String!): CRUDCommentResponse
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
    authorId: ID!
    author: User!
    postId: ID!
    post: Post!
    likedBy: [User!]
  }

  type CRUserResponse {
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

  type CRUDPostsResponse {
    code: Int!
    success: Boolean!
    message: String!
    posts: [Post]!
  }

  type CRUDPostResponse {
    code: Int!
    success: Boolean!
    message: String!
    post: Post
  }

  type CRUDCommentsResponse {
    code: Int!
    success: Boolean!
    message: String!
    comments: [Comment]!
  }

  type CRUDCommentResponse {
    code: Int!
    success: Boolean!
    message: String!
    comment: Comment
  }
`;
