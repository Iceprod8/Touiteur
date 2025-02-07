import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    getUsers: [User]!
    getUserById(id: ID!): RUUserResponse
    getUserByName(username: String!): RUUserResponse

    getPosts: CRUDPostsResponse
    getPostById(id: ID!): CRUDPostResponse
    getPostsUser(userId: ID!): CRUDPostsResponse

    getComments: CRUDCommentsResponse
    getCommentById(id: ID!): CRUDCommentResponse
    getCommentsUser(userId: ID!): CRUDCommentResponse
    getCommentsPost(postId: ID!): CRUDCommentResponse

    getAllLikes: GetLikesResponse
    getUserLikes(userId: ID!): GetLikesResponse
    getFamousLikes: GetFamousLikesResponse
  }

  type Mutation {
    createUser(username: String!, password: String!): AuthUserResponse
    updateUser(username: String!, password: String!): RUUserResponse
    signIn(username: String!, password: String!): AuthUserResponse

    createPost(content: String!): CRUDPostResponse
    deletePost(id: ID!): CRUDPostResponse
    updatePost(id: ID!, content: String!): CRUDPostResponse

    createComment(content: String!, postId: ID!): CRUDCommentResponse
    deleteComment(id: ID!): CRUDCommentResponse
    updateComment(id: ID!, content: String!): CRUDCommentResponse

    likePost(postId: ID!): CRUDPostResponse
    unlikePost(postId: ID!): CRUDPostResponse
    likeComment(commentId: ID!): CRUDCommentResponse
    unlikeComment(commentId: ID!): CRUDCommentResponse
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
    author: User!
    comments: [Comment!]
    likedBy: [User!]
  }

  type Comment {
    id: ID!
    content: String!
    author: User!
    post: Post!
    likedBy: [User!]
  }

  type RUUserResponse {
    code: Int!
    success: Boolean!
    message: String!
    user: User
  }

  type AuthUserResponse {
    code: Int!
    success: Boolean!
    message: String!
    user: User
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

  type GetLikesResponse {
    code: Int!
    success: Boolean!
    message: String!
    likedPosts: [Post]!
    likedComments: [Comment]!
  }

  type GetFamousLikesResponse {
    code: Int!
    success: Boolean!
    message: String!
    famousPosts: [Post]!
    famousComments: [Comment]!
  }
`;
