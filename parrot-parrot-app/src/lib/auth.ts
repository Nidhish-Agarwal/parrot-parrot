import { jwtVerify } from "jose";
import { REFRESH_TOKEN_SECRET } from "./env";

export async function verifyToken(token: string) {
  const secret = new TextEncoder().encode(REFRESH_TOKEN_SECRET);

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload; // contains user data like id, email, etc.
  } catch (err) {
    if(err instanceof Error) {
        console.error("JWT verification error:", err.message);
    }else{
        console.error("Token verification failed:", err);
    }
    return null;
  }
}
