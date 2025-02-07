/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

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
    "\n  query GetUser {\n    getUserFromJWT {\n      code\n        message\n        success\n        user {\n         id\n         username\n        }\n    }\n  }\n": typeof types.GetUserDocument,
    "\n  mutation CreatePost($content: String!) {\n    createPost(content: $content) {\n      code\n      success\n      message\n      post {\n        content\n        author {\n          username\n        }\n      }\n    }\n  }\n": typeof types.CreatePostDocument,
    "\n  query GetPostsUser($userId: ID!) {\n    getPostsUser(userId: $userId) {\n      code\n      message\n      success\n      posts {\n        likedBy {\n          username\n        }\n        id\n        author {\n          username\n        }\n        content\n        comments {\n          content\n          author {\n            username\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetPostsUserDocument,
    "\n  mutation DeletePost($id: ID!) {\n    deletePost(id: $id) {\n      code\n      success\n      message\n      post {\n        content\n        author {\n          username\n        }\n      }\n    }\n  }\n": typeof types.DeletePostDocument,
    "\nquery GetPosts {\n    getPosts {\n    code\n    success\n    message\n    posts {\n      likedBy{\n        username\n      }\n      id\n      content\n      author {\n        username\n      }\n      comments {\n        content\n        author {\n          username\n        }\n      }\n    }\n\n  }\n}\n": typeof types.GetPostsDocument,
    "\n  mutation SignIn($username: String!, $password: String!) {\n  signIn(username: $username, password: $password) {\n    success\n    message\n    token\n  }\n}\n": typeof types.SignInDocument,
    "\nquery GetFamousLikes {\n  getFamousLikes {\n    code\n    message\n    success\n    famousComments {\n      content\n      likedBy {\n        username\n      }\n    }\n    famousPosts {\n      id\n      content\n      comments {\n        id\n      }\n      author {\n        username\n      }\n      likedBy {\n        username\n      }\n    }\n  }\n}\n": typeof types.GetFamousLikesDocument,
    "\n  query GetPostById($id: ID!) {\n    getPostById(id: $id) {\n      code\n      message\n      success\n      post {\n        id\n        likedBy {\n          username\n        }\n        content\n        author {\n          username\n        }\n        comments {\n          id\n          content\n          author {\n            username\n          }\n          likedBy {\n            username\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetPostByIdDocument,
    "\n  mutation CreateComment($content: String!, $postId: ID!) {\n    createComment(content: $content, postId: $postId) {\n      code\n    }\n  }\n": typeof types.CreateCommentDocument,
    "\n  mutation Mutation($commentId: ID!) {\n    likeComment(commentId: $commentId) {\n      comment {\n        likedBy {\n          id\n        }\n      }\n    }\n  }\n": typeof types.MutationDocument,
    "\n  mutation UnlikeComment($commentId: ID!) {\n    unlikeComment(commentId: $commentId) {\n      comment {\n        likedBy {\n          username\n        }\n      }\n    }\n  }\n": typeof types.UnlikeCommentDocument,
    "\n  mutation likePost($postId: ID!) {\n    likePost(postId: $postId) {\n      code\n    }\n  }\n": typeof types.LikePostDocument,
    "\n  mutation unlikePost($postId: ID!) {\n    unlikePost(postId: $postId) {\n      code\n    }\n  }\n": typeof types.UnlikePostDocument,
    "\n  mutation CreateUser($username: String!, $password: String!) {\n  createUser(username: $username, password: $password) {\n    user {\n      id\n      username\n    }\n    success\n    message\n    token\n  }\n}\n": typeof types.CreateUserDocument,
    "\n  query User($username: String!) {\n    getUserByName(username: $username) {\n      user {\n        username\n        id\n        posts {\n          author {\n            id\n            username\n          }\n          id\n          likedBy {\n            username\n          }\n          content\n          comments {\n            id\n          }\n        }\n      }\n    }\n  }\n": typeof types.UserDocument,
};
const documents: Documents = {
    "\n  query GetUser {\n    getUserFromJWT {\n      code\n        message\n        success\n        user {\n         id\n         username\n        }\n    }\n  }\n": types.GetUserDocument,
    "\n  mutation CreatePost($content: String!) {\n    createPost(content: $content) {\n      code\n      success\n      message\n      post {\n        content\n        author {\n          username\n        }\n      }\n    }\n  }\n": types.CreatePostDocument,
    "\n  query GetPostsUser($userId: ID!) {\n    getPostsUser(userId: $userId) {\n      code\n      message\n      success\n      posts {\n        likedBy {\n          username\n        }\n        id\n        author {\n          username\n        }\n        content\n        comments {\n          content\n          author {\n            username\n          }\n        }\n      }\n    }\n  }\n": types.GetPostsUserDocument,
    "\n  mutation DeletePost($id: ID!) {\n    deletePost(id: $id) {\n      code\n      success\n      message\n      post {\n        content\n        author {\n          username\n        }\n      }\n    }\n  }\n": types.DeletePostDocument,
    "\nquery GetPosts {\n    getPosts {\n    code\n    success\n    message\n    posts {\n      likedBy{\n        username\n      }\n      id\n      content\n      author {\n        username\n      }\n      comments {\n        content\n        author {\n          username\n        }\n      }\n    }\n\n  }\n}\n": types.GetPostsDocument,
    "\n  mutation SignIn($username: String!, $password: String!) {\n  signIn(username: $username, password: $password) {\n    success\n    message\n    token\n  }\n}\n": types.SignInDocument,
    "\nquery GetFamousLikes {\n  getFamousLikes {\n    code\n    message\n    success\n    famousComments {\n      content\n      likedBy {\n        username\n      }\n    }\n    famousPosts {\n      id\n      content\n      comments {\n        id\n      }\n      author {\n        username\n      }\n      likedBy {\n        username\n      }\n    }\n  }\n}\n": types.GetFamousLikesDocument,
    "\n  query GetPostById($id: ID!) {\n    getPostById(id: $id) {\n      code\n      message\n      success\n      post {\n        id\n        likedBy {\n          username\n        }\n        content\n        author {\n          username\n        }\n        comments {\n          id\n          content\n          author {\n            username\n          }\n          likedBy {\n            username\n          }\n        }\n      }\n    }\n  }\n": types.GetPostByIdDocument,
    "\n  mutation CreateComment($content: String!, $postId: ID!) {\n    createComment(content: $content, postId: $postId) {\n      code\n    }\n  }\n": types.CreateCommentDocument,
    "\n  mutation Mutation($commentId: ID!) {\n    likeComment(commentId: $commentId) {\n      comment {\n        likedBy {\n          id\n        }\n      }\n    }\n  }\n": types.MutationDocument,
    "\n  mutation UnlikeComment($commentId: ID!) {\n    unlikeComment(commentId: $commentId) {\n      comment {\n        likedBy {\n          username\n        }\n      }\n    }\n  }\n": types.UnlikeCommentDocument,
    "\n  mutation likePost($postId: ID!) {\n    likePost(postId: $postId) {\n      code\n    }\n  }\n": types.LikePostDocument,
    "\n  mutation unlikePost($postId: ID!) {\n    unlikePost(postId: $postId) {\n      code\n    }\n  }\n": types.UnlikePostDocument,
    "\n  mutation CreateUser($username: String!, $password: String!) {\n  createUser(username: $username, password: $password) {\n    user {\n      id\n      username\n    }\n    success\n    message\n    token\n  }\n}\n": types.CreateUserDocument,
    "\n  query User($username: String!) {\n    getUserByName(username: $username) {\n      user {\n        username\n        id\n        posts {\n          author {\n            id\n            username\n          }\n          id\n          likedBy {\n            username\n          }\n          content\n          comments {\n            id\n          }\n        }\n      }\n    }\n  }\n": types.UserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUser {\n    getUserFromJWT {\n      code\n        message\n        success\n        user {\n         id\n         username\n        }\n    }\n  }\n"): (typeof documents)["\n  query GetUser {\n    getUserFromJWT {\n      code\n        message\n        success\n        user {\n         id\n         username\n        }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePost($content: String!) {\n    createPost(content: $content) {\n      code\n      success\n      message\n      post {\n        content\n        author {\n          username\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePost($content: String!) {\n    createPost(content: $content) {\n      code\n      success\n      message\n      post {\n        content\n        author {\n          username\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPostsUser($userId: ID!) {\n    getPostsUser(userId: $userId) {\n      code\n      message\n      success\n      posts {\n        likedBy {\n          username\n        }\n        id\n        author {\n          username\n        }\n        content\n        comments {\n          content\n          author {\n            username\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPostsUser($userId: ID!) {\n    getPostsUser(userId: $userId) {\n      code\n      message\n      success\n      posts {\n        likedBy {\n          username\n        }\n        id\n        author {\n          username\n        }\n        content\n        comments {\n          content\n          author {\n            username\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeletePost($id: ID!) {\n    deletePost(id: $id) {\n      code\n      success\n      message\n      post {\n        content\n        author {\n          username\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation DeletePost($id: ID!) {\n    deletePost(id: $id) {\n      code\n      success\n      message\n      post {\n        content\n        author {\n          username\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetPosts {\n    getPosts {\n    code\n    success\n    message\n    posts {\n      likedBy{\n        username\n      }\n      id\n      content\n      author {\n        username\n      }\n      comments {\n        content\n        author {\n          username\n        }\n      }\n    }\n\n  }\n}\n"): (typeof documents)["\nquery GetPosts {\n    getPosts {\n    code\n    success\n    message\n    posts {\n      likedBy{\n        username\n      }\n      id\n      content\n      author {\n        username\n      }\n      comments {\n        content\n        author {\n          username\n        }\n      }\n    }\n\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignIn($username: String!, $password: String!) {\n  signIn(username: $username, password: $password) {\n    success\n    message\n    token\n  }\n}\n"): (typeof documents)["\n  mutation SignIn($username: String!, $password: String!) {\n  signIn(username: $username, password: $password) {\n    success\n    message\n    token\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetFamousLikes {\n  getFamousLikes {\n    code\n    message\n    success\n    famousComments {\n      content\n      likedBy {\n        username\n      }\n    }\n    famousPosts {\n      id\n      content\n      comments {\n        id\n      }\n      author {\n        username\n      }\n      likedBy {\n        username\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery GetFamousLikes {\n  getFamousLikes {\n    code\n    message\n    success\n    famousComments {\n      content\n      likedBy {\n        username\n      }\n    }\n    famousPosts {\n      id\n      content\n      comments {\n        id\n      }\n      author {\n        username\n      }\n      likedBy {\n        username\n      }\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPostById($id: ID!) {\n    getPostById(id: $id) {\n      code\n      message\n      success\n      post {\n        id\n        likedBy {\n          username\n        }\n        content\n        author {\n          username\n        }\n        comments {\n          id\n          content\n          author {\n            username\n          }\n          likedBy {\n            username\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPostById($id: ID!) {\n    getPostById(id: $id) {\n      code\n      message\n      success\n      post {\n        id\n        likedBy {\n          username\n        }\n        content\n        author {\n          username\n        }\n        comments {\n          id\n          content\n          author {\n            username\n          }\n          likedBy {\n            username\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateComment($content: String!, $postId: ID!) {\n    createComment(content: $content, postId: $postId) {\n      code\n    }\n  }\n"): (typeof documents)["\n  mutation CreateComment($content: String!, $postId: ID!) {\n    createComment(content: $content, postId: $postId) {\n      code\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Mutation($commentId: ID!) {\n    likeComment(commentId: $commentId) {\n      comment {\n        likedBy {\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Mutation($commentId: ID!) {\n    likeComment(commentId: $commentId) {\n      comment {\n        likedBy {\n          id\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UnlikeComment($commentId: ID!) {\n    unlikeComment(commentId: $commentId) {\n      comment {\n        likedBy {\n          username\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UnlikeComment($commentId: ID!) {\n    unlikeComment(commentId: $commentId) {\n      comment {\n        likedBy {\n          username\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation likePost($postId: ID!) {\n    likePost(postId: $postId) {\n      code\n    }\n  }\n"): (typeof documents)["\n  mutation likePost($postId: ID!) {\n    likePost(postId: $postId) {\n      code\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation unlikePost($postId: ID!) {\n    unlikePost(postId: $postId) {\n      code\n    }\n  }\n"): (typeof documents)["\n  mutation unlikePost($postId: ID!) {\n    unlikePost(postId: $postId) {\n      code\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateUser($username: String!, $password: String!) {\n  createUser(username: $username, password: $password) {\n    user {\n      id\n      username\n    }\n    success\n    message\n    token\n  }\n}\n"): (typeof documents)["\n  mutation CreateUser($username: String!, $password: String!) {\n  createUser(username: $username, password: $password) {\n    user {\n      id\n      username\n    }\n    success\n    message\n    token\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query User($username: String!) {\n    getUserByName(username: $username) {\n      user {\n        username\n        id\n        posts {\n          author {\n            id\n            username\n          }\n          id\n          likedBy {\n            username\n          }\n          content\n          comments {\n            id\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query User($username: String!) {\n    getUserByName(username: $username) {\n      user {\n        username\n        id\n        posts {\n          author {\n            id\n            username\n          }\n          id\n          likedBy {\n            username\n          }\n          content\n          comments {\n            id\n          }\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;