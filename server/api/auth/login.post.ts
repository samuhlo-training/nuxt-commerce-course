import { z } from "zod";
import bcrypt from "bcryptjs";
import prisma from "~~/lib/prisma";

/**
 * █ [API] :: AUTH_LOGIN
 * =====================================================================
 * DESC:   Maneja el inicio de sesión del usuario.
 * META:   - Valida correo/contraseña con Zod
 *         - Verifica credenciales con bcrypt
 *         - Establece sesión de usuario
 * STATUS: ESTABLE
 * =====================================================================
 */

// =============================================================================
// █ ESQUEMA DE VALIDACIÓN
// =============================================================================
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
  // ===========================================================================
  // █ ANÁLISIS DEL CUERPO
  // ===========================================================================

  const { email, password } = await readValidatedBody(event, bodySchema.parse);

  // ===========================================================================
  // █ LÓGICA
  // ===========================================================================
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

  if (!isPasswordValid) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid password",
    });
  }

  // ===========================================================================
  // █ SESIÓN
  // ===========================================================================
  await setUserSession(event, {
    user: {
      id: String(user.id),
      name: user.name,
      email: user.email,
      roles: user.roles,
    },
    loggedInAt: new Date(),
  });

  // ===========================================================================
  // █ RESPUESTA
  // ===========================================================================
  return {
    message: "User logged in successfully",
    user: {
      id: String(user.id),
      name: user.name,
      email: user.email,
    },
  };
});
