import { DataSourceContext } from "../../context.js";
import { MutationResolvers } from "../../types.js";

export const createPost: MutationResolvers["createPost"] = async (
  _,
  { content },
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

    const newPost = await dataSources.db.post.create({
      data: { authorId: user.id, content },
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
    const postToDelete = await dataSources.db.post.findUnique({
      where: { id, authorId: user.id },
    });
    if (!postToDelete)
      throw new Error("❌ Post introuvable. Vérifiez l'ID et réessayez.");
    
    await dataSources.db.comment.deleteMany({ where: { postId:postToDelete.id } });

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
    const postToUpdate = await dataSources.db.post.findUnique({
      where: { id, authorId: user.id },
      include: { author: true },
    });
    if (!postToUpdate)
      throw new Error("❌ Post introuvable. Vérifiez l'ID et réessayez.");

    const updatedPost = await dataSources.db.post.update({
      where: { id },
      data: { content },
      include: { author: true },
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
