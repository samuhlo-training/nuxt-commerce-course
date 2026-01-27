export default defineEventHandler(async (event) => {
  if (!event.path.startsWith("/api/dashboard")) return;

  const session = await requireUserSession(event);
  const hasAdminRole = session.user.roles.includes("admin");

  if (!session.user || !hasAdminRole) {
    throw createError({
      statusCode: 401,
      statusMessage: "No tienes permisos para acceder a esta ruta",
    });
  }
});
