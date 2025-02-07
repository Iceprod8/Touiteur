import { DataSourceContext } from "../../context";
import { QueryResolvers } from "../../types";

export const getUsers: QueryResolvers["getUsers"] = async (
  _,
  __,
  { dataSources }: DataSourceContext
) => {
  const user = await dataSources.db.user.findMany();
  return user;
};

export const getUserByName: QueryResolvers["getUserByName"] = async (
  _,
  { username },
  { dataSources }: DataSourceContext
) => {
  try {
    const user = await dataSources.db.user.findFirst({
      where: { username },
    });

    if (!user) {
      return {
        code: 400,
        message: "Utilisateur introuvable",
        success: false,
        user: user,
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
      user: null,
    };
  }
};

export const getUserById: QueryResolvers["getUserById"] = async (
  _,
  { id },
  { dataSources }: DataSourceContext
) => {
  try {
    const user = await dataSources.db.user.findUnique({
      where: { id },
    });
    if (!user) {
      return {
        code: 400,
        message: "Utilisateur introuvable",
        success: false,
        user: null,
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
      user: null,
    };
  }
};

export const getUserFromJWT: QueryResolvers["getUserFromJWT"] = async (
  _,
  __,
  { dataSources, user }
) => {
  try {
    if (!user || !user.id)
      throw new Error(
        "L'utilisateur doit être authentifié pour accéder à cette requête."
      );

    const authenticatedUser = await dataSources.db.user.findUnique({
      where: { id: user.id },
    });
    if (!authenticatedUser)
      throw new Error("Utilisateur authentifié introuvable.");

    return {
      code: 200,
      success: true,
      message: "Utilisateur authentifié récupéré avec succès.",
      user: authenticatedUser,
    };
  } catch (error) {
    throw new Error(
      `Erreur lors de la récupération de l'utilisateur authentifié: ${error}`
    );
  }
};
