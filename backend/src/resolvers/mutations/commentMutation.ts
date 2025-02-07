import { DataSourceContext } from "../../context.js";
import { MutationResolvers } from "../../types.js";

export const createComment: MutationResolvers["createComment"] = async (
  _,
  { content, postId },
  { dataSources, user }: DataSourceContext
) => {
  try {
    if (!user) {
      return {
        code: 401,
        message: "Authentification requise",
        success: false,
        user: null,
      };
    }
    const author = await dataSources.db.user.findUnique({
      where: { id: user.id },
    });
    if (!author)
      throw new Error("❌ Auteur introuvable. Vérifiez l'ID et réessayez.");

    const newComment = await dataSources.db.comment.create({
      data: { authorId: user.id, content, postId },
    });
    return {
      code: 201,
      success: true,
      message: "✅ Commentaire créé avec succès.",
      comment: newComment,
    };
  } catch (error) {
    throw new Error(
      `⚠️ Erreur lors de la création du commentaire: ${
        (error as Error).message
      }`
    );
  }
};

export const deleteComment: MutationResolvers["deleteComment"] = async (
  _,
  { id },
  { dataSources, user }: DataSourceContext
) => {
  try {
    if (!user) {
      return {
        code: 401,
        message: "Authentification requise",
        success: false,
        user: null,
      };
    }
    const commentToDelete = await dataSources.db.comment.findUnique({
      where: { id, authorId: user.id },
    });
    if (!commentToDelete)
      throw new Error("❌ Comment introuvable. Vérifiez l'ID et réessayez.");

    await dataSources.db.comment.delete({ where: { id } });
    return {
      code: 200,
      success: true,
      message: "✅ Commentaire supprimé avec succès.",
      comment: commentToDelete,
    };
  } catch (error) {
    throw new Error(
      `⚠️ Erreur lors de la suppression du commentaire: ${
        (error as Error).message
      }`
    );
  }
};

export const updateComment: MutationResolvers["updateComment"] = async (
  _,
  { id, content },
  { dataSources, user }: DataSourceContext
) => {
  try {
    if (!user) {
      return {
        code: 401,
        message: "Authentification requise",
        success: false,
        user: null,
      };
    }
    const commentToUpdate = await dataSources.db.comment.findUnique({
      where: { id, authorId: user.id },
    });
    if (!commentToUpdate)
      throw new Error("❌ Comment introuvable. Vérifiez l'ID et réessayez.");

    const updatedComment = await dataSources.db.comment.update({
      where: { id },
      data: { content },
    });
    return {
      code: 200,
      success: true,
      message: "✅ Commentaire mis à jour avec succès.",
      comment: updatedComment,
    };
  } catch (error) {
    throw new Error(
      `⚠️ Erreur lors de la mise à jour du commentaire: ${
        (error as Error).message
      }`
    );
  }
};
