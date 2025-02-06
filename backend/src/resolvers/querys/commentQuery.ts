import { DataSourceContext } from "../../context.js";
import { QueryResolvers } from "../../types.js";

export const getComments: QueryResolvers["getComments"] = async (
  _,
  __,
  { dataSources }: DataSourceContext
) => {
  try {
    const comments = await dataSources.db.comment.findMany({
      include: { author: true, post: { include: { author: true } } },
    });
    if (!comments.length)
      throw new Error(
        "❌ Aucun commentaire trouvé. Veuillez réessayer plus tard."
      );
    return {
      code: 200,
      success: true,
      message: "✅ Commentaires récupéré avec succès.",
      comments,
    };
  } catch (error) {
    throw new Error(
      `⚠️ Erreur lors de la récupération des commentaires: ${
        (error as Error).message
      }`
    );
  }
};

export const getCommentById: QueryResolvers["getCommentById"] = async (
  _,
  { id },
  { dataSources }: DataSourceContext
) => {
  try {
    const comment = await dataSources.db.comment.findUnique({
      where: { id },
      include: { author: true, post: { include: { author: true } } },
    });
    if (!comment)
      throw new Error(
        "❌ Commentaire introuvable. Vérifiez l'ID et réessayez."
      );
    return {
      code: 200,
      success: true,
      message: "✅ Commentaire récupéré avec succès.",
      comment,
    };
  } catch (error) {
    throw new Error(
      `⚠️ Erreur lors de la récupération du commentaire: ${
        (error as Error).message
      }`
    );
  }
};

export const getCommentsUser: QueryResolvers["getCommentsUser"] = async (
  _,
  { userId },
  { dataSources }: DataSourceContext
) => {
  try {
    const comments = await dataSources.db.comment.findMany({
      where: { authorId: userId },
      include: { author: true },
    });
    if (!comments.length)
      throw new Error(
        "❌ Aucun commentaire trouvé pour cet utilisateur. Vérifiez l'ID et réessayez."
      );
    return {
      code: 200,
      success: true,
      message: "✅ Commentaires de l'utilisateur récupérés avec succès.",
      comments,
    };
  } catch (error) {
    throw new Error(
      `⚠️ Erreur lors de la récupération des commentaires de l'utilisateur: ${
        (error as Error).message
      }`
    );
  }
};

export const getCommentsPost: QueryResolvers["getCommentsPost"] = async (
  _,
  { postId },
  { dataSources }: DataSourceContext
) => {
  try {
    const comments = await dataSources.db.comment.findMany({
      where: { postId: postId },
      include: { author: true },
    });
    if (!comments.length)
      throw new Error(
        "❌ Aucun commentaire trouvé pour cet utilisateur. Vérifiez l'ID et réessayez."
      );
    return {
      code: 200,
      success: true,
      message: "✅ Commentaires de l'utilisateur récupérés avec succès.",
      comments,
    };
  } catch (error) {
    throw new Error(
      `⚠️ Erreur lors de la récupération des commentaires de l'utilisateur: ${
        (error as Error).message
      }`
    );
  }
};
