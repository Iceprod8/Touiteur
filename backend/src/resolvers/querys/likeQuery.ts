import { DataSourceContext } from "../../context";
import { QueryResolvers } from "../../types";

export const getAllLikes: QueryResolvers["getAllLikes"] = async (
  _,
  __,
  { dataSources }: DataSourceContext
) => {
  try {
    const posts = await dataSources.db.post.findMany();
    const comments = await dataSources.db.comment.findMany();

    return {
      code: 200,
      success: true,
      message: "✅ Tous les likes récupérés avec succès.",
      likedPosts: posts,
      likedComments: comments,
    };
  } catch (error) {
    throw new Error(
      `⚠️ Erreur lors de la récupération des likes: ${(error as Error).message}`
    );
  }
};

export const getUserLikes: QueryResolvers["getUserLikes"] = async (
  _,
  { userId },
  { dataSources }: DataSourceContext
) => {
  try {
    const user = await dataSources.db.user.findUnique({
      where: { id: userId },
      include: {
        likedPosts: true,
        likedComments: true,
      },
    });

    if (!user)
      throw new Error(
        "❌ Utilisateur introuvable. Vérifiez l'ID et réessayez."
      );

    return {
      code: 200,
      success: true,
      message: "✅ Likes de l'utilisateur récupérés avec succès.",
      likedPosts: user.likedPosts,
      likedComments: user.likedComments,
    };
  } catch (error) {
    throw new Error(
      `⚠️ Erreur lors de la récupération des likes de l'utilisateur: ${
        (error as Error).message
      }`
    );
  }
};
