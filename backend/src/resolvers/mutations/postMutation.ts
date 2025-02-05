import { DataSourceContext } from "../../context.js";
import { MutationResolvers } from "../../types.js";

export const createPost: MutationResolvers["createPost"] = async (
  _,
  { authorId, content },
  { dataSources }: DataSourceContext
) => {
  try {
    const author = await dataSources.db.user.findUnique({
      where: { id: authorId },
    });

    if (!author) throw new Error("Auteur introuvable.");

    const newPost = await dataSources.db.post.create({
      data: {
        authorId,
        content,
      },
      include: { author: true },
    });

    return {
      code: 201,
      message: "Post créé avec succès.",
      success: true,
      post: newPost,
    };
  } catch (error: unknown) {
    return {
      code: 500,
      message: `Erreur lors de la création du post: ${
        (error as Error).message
      }`,
      success: false,
      post: null,
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
      include: { author: true },
    });

    if (!postToDelete) throw new Error("Post introuvable.");

    const author = await dataSources.db.user.findUnique({
      where: { id: postToDelete.authorId },
    });

    if (!author)
      throw new Error(`Auteur introuvable pour le post ${postToDelete.id}`);

    if (!postToDelete) {
      return {
        code: 404,
        message: "Post introuvable.",
        success: false,
        post: null,
      };
    }

    await dataSources.db.post.delete({
      where: { id },
    });

    return {
      code: 200,
      message: "Post supprimé avec succès.",
      success: true,
      post: postToDelete,
    };
  } catch (error: unknown) {
    return {
      code: 500,
      message: `Erreur lors de la suppression du post: ${
        (error as Error).message
      }`,
      success: false,
      post: null,
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
      include: { author: true },
    });

    if (!postToUpdate) throw new Error("Post introuvable.");

    const author = await dataSources.db.user.findUnique({
      where: { id: postToUpdate.authorId },
    });

    if (!author)
      throw new Error(`Auteur introuvable pour le post ${postToUpdate.id}`);

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
      include: { author: true },
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
