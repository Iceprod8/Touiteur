export type Post = {
  id: string;
  content: string;
  authorId: string;
  comments: Comment[];
  likedBy: User[];
};

export type Comment = {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  likedBy: User[];
};

export type User = {
  id: string;
  username: string;
  posts: Post[]; // Liste des posts créés par l'utilisateur
  comments: Comment[]; // Liste des commentaires créés par l'utilisateur
  likedPosts: Post[]; // Liste des posts aimés par l'utilisateur
  likedComments: Comment[]; // Liste des commentaires aimés par l'utilisateur
};
