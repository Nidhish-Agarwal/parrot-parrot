const useLogout = () => {

  const logout = async () => {
    try {
      const response = await fetch("api/auth/logout", {
        method: "GET",
        credentials: "include",
      });
        if (!response.ok) {
            throw new Error("Logout failed");
        }
       
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  return logout;
};

export default useLogout;
