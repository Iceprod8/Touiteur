import { DataSourceContext } from "../../context.js";
import { QueryResolvers } from "../../types.js";

export const getPosts: QueryResolvers["getPosts"] = async (
  _,
  __,
  { dataSources }: DataSourceContext
) => {
  try {
    const posts = await dataSources.db.post.findMany();
    if (!posts || posts.length === 0) throw new Error("Aucun post trouvé.");

    const postsWithAuthors = await Promise.all(
      posts.map(async (post) => {
        const author = await dataSources.db.user.findFirst({
          where: { id: post.authorId },
        });
        if (!author)
          throw new Error(`Auteur introuvable pour le post ${post.id}`);

        return {
          ...post,
          author,
        };
      })
    );

    return postsWithAuthors;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des posts: ${error}`);
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
    });

    if (!post) throw new Error("Post introuvable.");

    const author = await dataSources.db.user.findUnique({
      where: { id: post.authorId },
    });

    if (!author) throw new Error(`Auteur introuvable pour le post ${post.id}`);

    return {
      ...post,
      author: {
        ...author,
        posts: dataSources.db.post.findMany({ where: { authorId: author.id } }),
        likedPosts: [],
        comments: dataSources.db.comment.findMany({
          where: { authorId: author.id },
        }),
        likedComments: [],
      },
    };
  } catch (error) {
    throw new Error(
      `Erreur lors de la récupération du post: ${(error as Error).message}`
    );
  }
};
