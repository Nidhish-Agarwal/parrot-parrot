import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env variable: ${name}`);
  }
  return value;
}

export const ACCESS_TOKEN_SECRET = getEnvVar("ACCESS_TOKEN_SECRET");
export const REFRESH_TOKEN_SECRET = getEnvVar("REFRESH_TOKEN_SECRET");
export const NEXT_URL = getEnvVar("NEXT_URL");
export const SOCKET_URL = getEnvVar("SOCKET_URL");