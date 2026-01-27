import { z } from "zod";
import bcrypt from "bcryptjs";
import prisma from "~~/lib/prisma";

const bodySchema = z.object({
  email: z
    .string()
    .toLowerCase()
    .trim()
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Email is not valid",
    }),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, bodySchema.parse);
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid user",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  await setUserSession(event, {
    user: {
      id: String(user.id),
      name: user.name,
      email: user.email,
      roles: user.roles,
    },
    loggedInAt: new Date(),
  });

  if (!isPasswordValid) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid password",
    });
  }

  return {
    message: "User logged in successfully",
    user: {
      id: String(user.id),
      name: user.name,
      email: user.email,
    },
  };
});
