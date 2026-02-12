/**
 * █ [MIDDLEWARE] :: GUEST_ONLY
 * =====================================================================
 * DESC:   Prevent authenticated users from accessing login/register.
 * META:   - Redirects to / if logged in
 * STATUS: STABLE
 * =====================================================================
 */
export default defineNuxtRouteMiddleware((to, from) => {
  const { isLoggedIn } = useAuthentication();

  if (to.path.startsWith("/login") && isLoggedIn.value) {
    return navigateTo("/");
  }

  if (to.path.startsWith("/register") && isLoggedIn.value) {
    return navigateTo("/");
  }
});
