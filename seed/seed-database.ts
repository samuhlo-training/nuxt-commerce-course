import prisma from "../lib/prisma.ts";
import { siteReviews } from "./site-reviews.seed.ts";

async function seedDatabase() {
  // Purgar base de datos
  await prisma.siteReview.deleteMany();

  // Insertar registros
  await prisma.siteReview.createMany({
    data: siteReviews,
  });

  console.log("Database seeded successfully");
}

seedDatabase();
