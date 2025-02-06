import { Resolvers } from "./types.js";

/*
USER
*/
import { createUser, signIn } from "./resolvers/mutations/userMutation.js";
import {
  getUsers,
  getUserById,
  getUserByName,
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

export const resolvers: Resolvers = {
  Query: {
    getUsers,
    getUserByName,
    getUserById,

    getPosts,
    getPostById,
    getPostsUser,

    getComments,
    getCommentById,
    getCommentsPost,
    getCommentsUser,
  },

  Mutation: {
    createUser,
    signIn,

    createPost,
    deletePost,
    updatePost,

    createComment,
    deleteComment,
    updateComment,
  },

  User: {
    posts: (parent, _, { dataSources }) => {
      return dataSources.db.post.findMany({
        where: { authorId: parent.id },
        include: { author: true },
      });
    },
    comments: (parent, _, { dataSources }) => {
      return dataSources.db.comment.findMany({
        where: { authorId: parent.id },
        include: { author: true, post: { include: { author: true } } },
      });
    },
  },

  Post: {
    comments: (parent, _, { dataSources }) => {
      return dataSources.db.comment.findMany({
        where: { postId: parent.id },
        include: { author: true, post: { include: { author: true } } },
      });
    },
  },
};
