import { DataSourceContext } from "../../context.js";
import { QueryResolvers } from "../../types.js";

export const getPosts: QueryResolvers["getPosts"] = async (
  _,
  __,
  { dataSources }: DataSourceContext
) => {
  try {
    const posts = await dataSources.db.post.findMany({
      include: { author: true },
    });
    if (!posts.length)
      throw new Error("❌ Aucun post trouvé. Veuillez réessayer plus tard.");
    return {
      code: 200,
      success: true,
      message: "✅ Posts récupéré avec succès.",
      posts,
    };
  } catch (error) {
    throw new Error(`⚠️ Erreur lors de la récupération des posts: ${error}`);
  }
};

export const getPostById: QueryResolvers["getPostById"] = async (
  _,
  { id },
  { dataSources }: DataSourceContext
) => {
  try {
    const post = await dataSources.db.post.findUnique({
      where: { id },
      include: { author: true },
    });
    if (!post)
      throw new Error("❌ Post introuvable. Vérifiez l'ID et réessayez.");
    return {
      code: 200,
      success: true,
      message: "✅ Post récupéré avec succès.",
      post,
    };
  } catch (error) {
    throw new Error(`⚠️ Erreur lors de la récupération du post: ${error}`);
  }
};

export const getPostsUser: QueryResolvers["getPostsUser"] = async (
  _,
  { userId },
  { dataSources }: DataSourceContext
) => {
  try {
    const posts = await dataSources.db.post.findMany({
      where: { authorId: userId },
      include: { author: true },
    });
    if (!posts.length)
      throw new Error(
        "❌ Aucun post trouvé pour cet utilisateur. Vérifiez l'ID et réessayez."
      );
    return {
      code: 200,
      success: true,
      message: "✅ Posts de l'utilisateur récupérés avec succès.",
      posts,
    };
  } catch (error) {
    throw new Error(
      `⚠️ Erreur lors de la récupération des posts de l'utilisateur: ${error}`
    );
  }
};
