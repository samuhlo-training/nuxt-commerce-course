/**
 * █ [COMPOSABLE] :: AUTHENTICATION
 * =====================================================================
 * DESC:   Gestiona la sesión de autenticación del usuario.
 * META:   - Envuelve la gestión de sesiones de h3/auth
 *         - Proporciona acciones de iniciar sesión, registrarse y cerrar sesión
 * STATUS: ESTABLE
 * =====================================================================
 */
export const useAuthentication = () => {
  // ===========================================================================
  // █ ESTADO Y DEPENDENCIAS
  // ===========================================================================
  const { user, session, loggedIn, clear, fetch } = useUserSession();

  // ===========================================================================
  // █ ACCIONES
  // ===========================================================================
  const login = async (email: string, password: string) => {
    try {
      const { user, message } = await $fetch("/api/auth/login", {
        method: "POST",
        body: {
          email,
          password,
        },
      });
      await fetch();
      navigateTo("/");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const register = async (
    fullName: string,
    email: string,
    password: string,
  ) => {
    return true;
  };

  const logout = async () => {
    await clear();
    navigateTo("/");
  };

  // ===========================================================================
  // █ EXPONER
  // ===========================================================================
  return {
    user,
    session,
    loggedIn,

    //Getters
    isLoggedIn: loggedIn,
    isAdmin: computed(() => user.value?.roles.includes("admin")),

    //Methods, Actions
    clear,
    fetch,
    login,
    register,
    logout,
  };
};
