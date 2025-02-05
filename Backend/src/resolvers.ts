import { Resolvers } from "./types.js";
import { hashPassword } from "./modules/auth.js";
import { signIn } from "./resolvers/mutations/signIn.js";
import { DataSourceContext } from "./context.js";
import { getPosts } from "./resolvers/query/PostQuerry.js";

export const resolvers: Resolvers = {
  Query: {
    getPosts,
    getUsers: async (_, __, context) => {
      const user = await context.dataSources.db.user.findMany();
      return user;
    },
    getUserByName: async (_, { username }, context) => {
      try {
        const user = await context.dataSources.db.user.findFirst({
          where: { username },
        });

        if (!user) {
          return {
            code: 400,
            message: "Utilisateur introuvable",
            success: false,
            username: null,
          };
        }

        return {
          code: 201,
          message: "Utilisateur trouvé",
          success: true,
          username: user.username,
        };
      } catch (error) {
        return {
          code: 500,
          message: "Une erreur est survenue",
          success: false,
          username: null,
        };
      }
    },
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
