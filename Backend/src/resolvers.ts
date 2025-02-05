import { Resolvers, Speciality } from "./types.js";
import { hashPassword } from "./modules/auth.js";
import { signIn } from "./resolvers/mutations/signIn.js";

const doctorsData = [
  {
    name: "Samia Mekame",
    speciality: Speciality.Ophtalmologist,
  },
  {
    name: "Catherine Bedoy",
    speciality: Speciality.Ophtalmologist,
  },
];

export const resolvers: Resolvers = {
  Query: {
    doctors: (_, { specialities }) => {
      return specialities
        ? doctorsData.filter((doctor) =>
            specialities.includes(doctor.speciality)
          )
        : doctorsData;
    },
    getUser: async (_, __, context) => {
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
    getUserById: async (_, { id }, context) => {
      try {
        const user = await context.dataSources.db.user.findUnique({
          where: { id },
        });
        if (!user) {
          return {
            code: 400,
            message: "Utilisateur introuvable",
            success: false,
            id: null,
          };
        }

        return {
          code: 201,
          message: "Utilisateur trouvé",
          success: true,
          user: user,
        };
      } catch (error) {
        return {
          code: 500,
          message: "Une erreur est survenue",
          success: false,
          id: null,
        };
      }
    },
  },
  Mutation: {
    createUser: async (_, { username, password }, context) => {
      try {
        const createdUser = await context.dataSources.db.user.create({
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
