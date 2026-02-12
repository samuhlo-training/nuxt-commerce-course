/**
 * █ [MIDDLEWARE] :: AUTH
 * =====================================================================
 * DESC:   Protege rutas que requieren autenticación.
 * META:   - Redirige a /login si es invitado
 *         - Redirige a / si accede al área de administración sin rol
 * STATUS: ESTABLE
 * =====================================================================
 */
export default defineNuxtRouteMiddleware((to, from) => {
  const { isLoggedIn, isAdmin } = useAuthentication();

  if (!isLoggedIn.value) {
    return navigateTo("/login");
  }

  if (to.path.startsWith("/dashboard") && !isAdmin.value) {
    return navigateTo("/");
  }
});
