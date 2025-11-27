import prisma from "../lib/prisma.ts";
import { siteReviews } from "./site-reviews.seed.ts";
import { products } from "./products.seed.ts";

async function seedDatabase() {
  // Purgar base de datos
  await prisma.siteReviews.deleteMany();
  await prisma.product.deleteMany();

  // Insertar registros
  await prisma.siteReviews.createMany({
    data: siteReviews,
  });
  await prisma.product.createMany({
    data: products,
  });

  console.log("Database seeded successfully");
}

seedDatabase();
