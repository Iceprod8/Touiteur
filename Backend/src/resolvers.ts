import { Resolvers } from "./types.js";
import { hashPassword } from "./modules/auth.js";
import { signIn } from "./resolvers/mutations/signIn.js";
import { DataSourceContext } from "./context.js";
import { getPosts } from "./resolvers/querys/postQuerry.js";
import {
  getUser,
  getUserById,
  getUserByName,
} from "./resolvers/querys/userQuery.js";

export const resolvers: Resolvers = {
  Query: {
    getUser,
    getUserByName,
    getUserById,
    getPosts,
  },

  Mutation: {
    createUser: async (
      _,
      { username, password },
      { dataSources }: DataSourceContext
    ) => {
      try {
        const createdUser = await dataSources.db.user.create({
          data: {
            username,
            password: await hashPassword(password),
          },
        });

        return {
          code: 201,
          message: `User ${username} has been created`,
          success: true,
          user: {
            id: createdUser.id,
            username: createdUser.username,
          },
        };
      } catch {
        return {
          code: 400,
          message: "Something bad happened",
          success: false,
          user: null,
        };
      }
    },
    signIn,
  },
};
