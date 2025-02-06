import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";
import db from "./datasources/db.js";
import { getUser } from "./modules/auth.js";
import populate from "../scripts/populate.js";

async function checkAndPopulateDB() {
  const usersCount = await db.user.count();
  if (usersCount === 0) {
    console.log(
      "⚠️ Aucune donnée trouvée, lancement du script de peuplement..."
    );
    await populate();
  } else {
    console.log("✅ Données détectées, démarrage du serveur...");
  }
}

async function startServer() {
  await checkAndPopulateDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      const { cache } = server;
      const authorization = req.headers.authorization?.split("Bearer ")?.[1];
      const user = authorization ? getUser(authorization) : null;
      return {
        dataSources: {
          db,
        },
        user,
      };
    },
  });

  console.log(`🚀 Server ready at: ${url}`);
}

startServer().catch((error) => {
  console.error("❌ Erreur lors du démarrage du serveur :", error);
});
