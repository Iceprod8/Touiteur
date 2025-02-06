import { DataSourceContext } from "../../context";
import { MutationResolvers } from "../../types";

export const likePost: MutationResolvers["likePost"] = async (
  _,
  { userId, postId },
  { dataSources }: DataSourceContext
) => {
  try {
    const post = await dataSources.db.post.findUnique({
      where: { id: postId },
      include: { likedBy: true },
    });

    if (!post)
      throw new Error("❌ Post introuvable. Vérifiez l'ID et réessayez.");

    const alreadyLiked = post.likedBy.some((user) => user.id === userId);
    if (alreadyLiked)
      throw new Error("❌ Ce post est déjà liké par cet utilisateur.");

    await dataSources.db.post.update({
      where: { id: postId },
      data: {
        likedBy: {
          connect: { id: userId },
        },
      },
    });

    return {
      code: 200,
      success: true,
      message: "✅ Post liké avec succès.",
      post: post,
    };
  } catch (error) {
    throw new Error(
      `⚠️ Erreur lors du like du post: ${(error as Error).message}`
    );
  }
};

export const unlikePost: MutationResolvers["unlikePost"] = async (
  _,
  { userId, postId },
  { dataSources }: DataSourceContext
) => {
  try {
    const post = await dataSources.db.post.findUnique({
      where: { id: postId },
      include: { likedBy: true },
    });

    if (!post)
      throw new Error("❌ Post introuvable. Vérifiez l'ID et réessayez.");

    const alreadyLiked = post.likedBy.some((user) => user.id === userId);
    if (!alreadyLiked)
      throw new Error("❌ Ce post n'est pas liké par cet utilisateur.");

    await dataSources.db.post.update({
      where: { id: postId },
      data: {
        likedBy: {
          disconnect: { id: userId },
        },
      },
    });

    return {
      code: 200,
      success: true,
      message: "✅ Like retiré du post avec succès.",
      post: post,
    };
  } catch (error) {
    throw new Error(
      `⚠️ Erreur lors du retrait du like du post: ${(error as Error).message}`
    );
  }
};

export const likeComment: MutationResolvers["likeComment"] = async (
  _,
  { userId, commentId },
  { dataSources }: DataSourceContext
) => {
  try {
    const comment = await dataSources.db.comment.findUnique({
      where: { id: commentId },
      include: { likedBy: true },
    });

    if (!comment)
      throw new Error(
        "❌ Commentaire introuvable. Vérifiez l'ID et réessayez."
      );

    const alreadyLiked = comment.likedBy.some((user) => user.id === userId);
    if (alreadyLiked)
      throw new Error("❌ Ce commentaire est déjà liké par cet utilisateur.");

    await dataSources.db.comment.update({
      where: { id: commentId },
      data: {
        likedBy: {
          connect: { id: userId },
        },
      },
    });

    return {
      code: 200,
      success: true,
      message: "✅ Commentaire liké avec succès.",
      comment,
    };
  } catch (error) {
    throw new Error(
      `⚠️ Erreur lors du like du commentaire: ${(error as Error).message}`
    );
  }
};

export const unlikeComment: MutationResolvers["unlikeComment"] = async (
  _,
  { userId, commentId },
  { dataSources }: DataSourceContext
) => {
  try {
    const comment = await dataSources.db.comment.findUnique({
      where: { id: commentId },
      include: { likedBy: true },
    });

    if (!comment)
      throw new Error(
        "❌ Commentaire introuvable. Vérifiez l'ID et réessayez."
      );

    const alreadyLiked = comment.likedBy.some((user) => user.id === userId);
    if (!alreadyLiked)
      throw new Error("❌ Ce commentaire n'est pas liké par cet utilisateur.");

    await dataSources.db.comment.update({
      where: { id: commentId },
      data: {
        likedBy: {
          disconnect: { id: userId },
        },
      },
    });

    return {
      code: 200,
      success: true,
      message: "✅ Like retiré du commentaire avec succès.",
      comment,
    };
  } catch (error) {
    throw new Error(
      `⚠️ Erreur lors du retrait du like du commentaire: ${
        (error as Error).message
      }`
    );
  }
};
