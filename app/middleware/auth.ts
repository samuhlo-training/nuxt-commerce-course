/**
 * █ [MIDDLEWARE] :: AUTH
 * =====================================================================
 * DESC:   Protects routes requiring authentication.
 * META:   - Redirects to /login if guest
 *         - Redirects to / if accessing admin area without role
 * STATUS: STABLE
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
