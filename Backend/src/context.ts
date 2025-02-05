import { PrismaClient } from "@prisma/client";
import { AuthenticatedUser } from "./modules/auth.js";
import { db } from "./datasources/db.js";
export type DataSourceContext = {
  dataSources: {
    db: PrismaClient;
    db: db;
  };
  user: AuthenticatedUser | null;
};
