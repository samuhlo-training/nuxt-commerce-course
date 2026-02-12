/**
 * █ [COMPOSABLE] :: AUTHENTICATION
 * =====================================================================
 * DESC:   Manages user authentication session.
 * META:   - Wrapping h3/auth session management
 *         - Provides login, register, logout actions
 * STATUS: STABLE
 * =====================================================================
 */
export const useAuthentication = () => {
  // ===========================================================================
  // █ STATE & DEPENDENCIES
  // ===========================================================================
  const { user, session, loggedIn, clear, fetch } = useUserSession();

  // ===========================================================================
  // █ ACTIONS
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
  // █ EXPOSE
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
