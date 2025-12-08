import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";
import path from "path";

// Load .env.local FIRST (overrides .env)
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
// Then load .env as fallback
dotenv.config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required to run drizzle commands");
}

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    url: connectionString,
  },
});
