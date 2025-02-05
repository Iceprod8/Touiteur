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
