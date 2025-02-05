import { DataSourceContext } from "../../context.js";
import { MutationResolvers } from "../../types.js";

export const createUser: MutationResolvers["createUser"] = async (
  _,
  { username, password },
  { dataSources }: DataSourceContext
) => {
  try {
    const existingUser = await dataSources.db.user.findFirst({
      where: { username },
    });

    if (existingUser) {
      return {
        code: 400,
        message: "Ce nom d'utilisateur est déjà pris.",
        success: false,
        user: null,
      };
    }

    const createdUser = await dataSources.db.user.create({
      data: {
        username,
        password, // Tu devrais hasher le password avant l'insertion
      },
    });

    return {
      code: 201,
      message: `Utilisateur ${username} créé avec succès.`,
      success: true,
      user: {
        ...createdUser,
        posts: [],
        likedPosts: [],
        comments: [],
        likedComments: [],
      },
    };
  } catch (error) {
    return {
      code: 500,
      message: `Erreur lors de la création de l'utilisateur: ${
        (error as Error).message
      }`,
      success: false,
      user: null,
    };
  }
};

export const deletePost: MutationResolvers["deletePost"] = async (
  _,
  { id },
  { dataSources }: DataSourceContext
) => {
  try {
    const postToDelete = await dataSources.db.post.findUnique({
      where: { id },
    });

    if (!postToDelete) {
      return {
        code: 404,
        message: "Post introuvable.",
        success: false,
      };
    }

    await dataSources.db.post.delete({
      where: { id },
    });

    return {
      code: 200,
      message: "Post supprimé avec succès.",
      success: true,
    };
  } catch (error: unknown) {
    return {
      code: 500,
      message: `Erreur lors de la suppression du post: ${
        (error as Error).message
      }`,
      success: false,
    };
  }
};

export const updatePost: MutationResolvers["updatePost"] = async (
  _,
  { id, content },
  { dataSources }: DataSourceContext
) => {
  try {
    const postToUpdate = await dataSources.db.post.findUnique({
      where: { id },
    });

    if (!postToUpdate) {
      return {
        code: 404,
        message: "Post introuvable.",
        success: false,
        post: null,
      };
    }

    const updatedPost = await dataSources.db.post.update({
      where: { id },
      data: { content },
    });

    return {
      code: 200,
      message: "Post mis à jour avec succès.",
      success: true,
      post: updatedPost,
    };
  } catch (error: unknown) {
    return {
      code: 500,
      message: `Erreur lors de la mise à jour du post: ${
        (error as Error).message
      }`,
      success: false,
      post: null,
    };
  }
};
