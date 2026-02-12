/**
 * █ [MIDDLEWARE] :: GUEST_ONLY
 * =====================================================================
 * DESC:   Evita que usuarios autenticados accedan al login/registro.
 * META:   - Redirige a / si ha iniciado sesión
 * STATUS: ESTABLE
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
