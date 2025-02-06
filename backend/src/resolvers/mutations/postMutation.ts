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
    if (!author)
      throw new Error("❌ Auteur introuvable. Vérifiez l'ID et réessayez.");

    const newPost = await dataSources.db.post.create({
      data: { authorId, content },
    });
    return {
      code: 201,
      success: true,
      message: "✅ Post créé avec succès.",
      post: newPost,
    };
  } catch (error) {
    throw new Error(
      `⚠️ Erreur lors de la création du post: ${(error as Error).message}`
    );
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
    if (!postToDelete)
      throw new Error("❌ Post introuvable. Vérifiez l'ID et réessayez.");

    await dataSources.db.post.delete({ where: { id } });
    return {
      code: 200,
      success: true,
      message: "✅ Post supprimé avec succès.",
      post: postToDelete,
    };
  } catch (error) {
    throw new Error(
      `⚠️ Erreur lors de la suppression du post: ${(error as Error).message}`
    );
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
    if (!postToUpdate)
      throw new Error("❌ Post introuvable. Vérifiez l'ID et réessayez.");

    const updatedPost = await dataSources.db.post.update({
      where: { id },
      data: { content },
    });
    return {
      code: 200,
      success: true,
      message: "✅ Post mis à jour avec succès.",
      post: updatedPost,
    };
  } catch (error) {
    throw new Error(
      `⚠️ Erreur lors de la mise à jour du post: ${(error as Error).message}`
    );
  }
};
