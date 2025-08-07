
import { AuthType } from "@/lib/interfaces/authType";

// Making a hook to get a new accessToken and storing it in the AuthContext

function useRefreshToken() {

  const refresh = async () => {
    const response = await fetch("/api/auth/refresh", {
      method: "GET",
    credentials: "include",
    })
    if (!response.ok) {
      console.error("Failed to refresh token");
      throw new Error("Failed to refresh token");
    }
    const data : AuthType = await response.json();

    return data.accessToken;
  };

  return refresh;
}

export default useRefreshToken;
