import { defineConfig, env } from "prisma/config";
import { config } from "dotenv";

// Cargar .env
config();

export default defineConfig({
  // Nota: Ahora schema es relativo a la raíz
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
