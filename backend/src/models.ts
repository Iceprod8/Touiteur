import { Comment, Post, User } from "@prisma/client";

export type UserModel = Omit<User, "password">;
export type PostModel = Post;
export type CommentModel = Comment;
