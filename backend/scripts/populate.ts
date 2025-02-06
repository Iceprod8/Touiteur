import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

interface User {
  username: string;
  password: string;
}

interface Post {
  content: string;
  authorId: string;
}

interface Comment {
  content: string;
  authorId: string;
  postId: string;
}

export default async function populate(): Promise<void> {
  const usersCount: number = await prisma.user.count();
  if (usersCount > 0) {
    console.log("✅ La base de données est déjà peuplée.");
    return;
  }

  console.log("🔄 Peuplement de la base de données...");

  const passwordHash: string = await bcrypt.hash("password123", 10);

  const usersData: User[] = [
    { username: "alice_wonder", password: passwordHash },
    { username: "bob_builder", password: passwordHash },
    { username: "charlie_chaplin", password: passwordHash },
    { username: "diana_prince", password: passwordHash },
    { username: "edward_snow", password: passwordHash },
  ];

  await prisma.user.createMany({ data: usersData });
  const usersList = await prisma.user.findMany();

  const postsData: Post[] = [
    {
      content: "Aujourd'hui, j'ai découvert un super café! ☕",
      authorId: usersList[0].id,
    },
    {
      content: "La programmation en JavaScript est géniale! 🚀",
      authorId: usersList[1].id,
    },
    {
      content: "J'ai vu un super film hier soir 🎬",
      authorId: usersList[2].id,
    },
    {
      content: "Faire du sport tous les jours est un vrai défi! 💪",
      authorId: usersList[3].id,
    },
    { content: "Quel est votre livre préféré? 📚", authorId: usersList[4].id },
  ];

  await prisma.post.createMany({ data: postsData });
  const postsList = await prisma.post.findMany();

  const commentsData: Comment[] = [
    {
      content: "J'adore ce café aussi! ☕",
      authorId: usersList[1].id,
      postId: postsList[0].id,
    },
    {
      content: "JavaScript est vraiment puissant!",
      authorId: usersList[2].id,
      postId: postsList[1].id,
    },
    {
      content: "Quel film as-tu regardé? 🎥",
      authorId: usersList[3].id,
      postId: postsList[2].id,
    },
    {
      content: "Le sport, c'est la clé d'une bonne santé!",
      authorId: usersList[4].id,
      postId: postsList[3].id,
    },
    {
      content: "J'adore '1984' de George Orwell!",
      authorId: usersList[0].id,
      postId: postsList[4].id,
    },
  ];

  await prisma.comment.createMany({ data: commentsData });

  console.log("✅ Base de données peuplée avec succès.");
}
