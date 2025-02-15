import { Resolvers } from "./types.js";

/*
USER
*/
import {
  createUser,
  signIn,
  updateUser,
} from "./resolvers/mutations/userMutation.js";
import {
  getUsers,
  getUserById,
  getUserByName,
  getUserFromJWT,
} from "./resolvers/querys/userQuery.js";

/*
POST
*/
import {
  getPostById,
  getPosts,
  getPostsUser,
} from "./resolvers/querys/postQuery.js";
import {
  createPost,
  deletePost,
  updatePost,
} from "./resolvers/mutations/postMutation.js";

/*
COMMENT
*/
import {
  getComments,
  getCommentById,
  getCommentsPost,
  getCommentsUser,
} from "./resolvers/querys/commentQuery.js";
import {
  createComment,
  deleteComment,
  updateComment,
} from "./resolvers/mutations/commentMutation.js";

/*
LIKE
*/
import {
  likeComment,
  likePost,
  unlikeComment,
  unlikePost,
} from "./resolvers/mutations/likeMutation.js";
import {
  getAllLikes,
  getFamousLikes,
  getUserLikes,
} from "./resolvers/querys/likeQuery.js";

export const resolvers: Resolvers = {
  Query: {
    getUsers,
    getUserByName,
    getUserById,
    getUserFromJWT,

    getPosts,
    getPostById,
    getPostsUser,

    getComments,
    getCommentById,
    getCommentsPost,
    getCommentsUser,

    getAllLikes,
    getUserLikes,
    getFamousLikes,
  },

  Mutation: {
    createUser,
    updateUser,
    signIn,

    createPost,
    deletePost,
    updatePost,

    createComment,
    deleteComment,
    updateComment,

    likePost,
    unlikePost,
    likeComment,
    unlikeComment,
  },

  User: {
    posts: (parent, _, { dataSources }) => {
      return dataSources.db.post.findMany({
        where: { authorId: parent.id },
      });
    },
    comments: ({ id }, _, { dataSources }) => {
      return dataSources.db.comment.findMany({
        where: { authorId: id },
      });
    },
    likedPosts: ({ id }, _, { dataSources }) => {
      return dataSources.db.post.findMany({
        where: { authorId: id },
      });
    },
    likedComments: ({ id }, _, { dataSources }) => {
      return dataSources.db.comment.findMany({
        where: { authorId: id },
      });
    },
  },

  Post: {
    author: ({ authorId }, _, { dataSources }) => {
      return dataSources.db.user.findUniqueOrThrow({ where: { id: authorId } });
    },
    comments: ({ id }, _, { dataSources }) => {
      return dataSources.db.comment.findMany({
        where: { postId: id },
      });
    },
    likedBy: async ({ id }, _, { dataSources }) => {
      return dataSources.db.user.findMany({
        where: {
          likedPosts: { some: { id } },
        },
      });
    },
  },

  Comment: {
    author: ({ authorId }, _, { dataSources }) => {
      return dataSources.db.user.findUniqueOrThrow({ where: { id: authorId } });
    },
    likedBy: async ({ id }, _, { dataSources }) => {
      return dataSources.db.user.findMany({
        where: {
          likedComments: { some: { id } },
        },
      });
    },
  },
};
