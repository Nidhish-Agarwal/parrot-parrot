// socketServer.ts
import { Server as IOServer, Socket } from "socket.io";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NEXT_URL, REFRESH_TOKEN_SECRET } from "@/lib/env";
import { Server as HTTPServer } from "http";

// Extend socket type to include userId
interface AuthenticatedSocket extends Socket {
  userId: string;
}

let io: IOServer;

// Simple cookie parser (no external lib needed)
function parseCookies(cookieHeader?: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;

  cookieHeader.split(";").forEach((cookie) => {
    const [name, ...rest] = cookie.split("=");
    cookies[name.trim()] = decodeURIComponent(rest.join("="));
  });

  return cookies;
}

export function initSocket(server: HTTPServer) {
  io = new IOServer(server, {
    cors: {
      origin: NEXT_URL,
      credentials: true,
    },
  });

  io.use((socket, next) => {
    // Parse cookies from handshake headers
    const cookies = parseCookies(socket.request.headers.cookie);
    (socket as any).cookies = cookies;
    next();
  });

  io.on("connection", (socket) => {
    const authSocket = socket as AuthenticatedSocket;
    const cookies = (socket as any).cookies;
    const access_token = cookies?.jwt;

    if (!access_token) {
      console.log("No token provided in socket connection");
      socket.disconnect(true);
      return;
    }

    try {
      const decoded = jwt.verify(
        access_token,
        REFRESH_TOKEN_SECRET
      ) as JwtPayload;
      authSocket.userId = decoded.userId;

      console.log("Socket connected for user:", authSocket.userId);

      // Join user-specific room
      socket.join(authSocket.userId);

      // Example event listeners
      socket.on("some-event", (data) => {
        console.log(`Received some-event from user ${authSocket.userId}`, data);
      });

      socket.on("disconnect", (reason) => {
        console.log(`Client disconnected: ${socket.id}, reason: ${reason}`);
      });
    } catch (err: any) {
      console.log("Socket auth failed:", err.message);
      socket.emit("auth_error", { message: "Invalid or expired token" });
      socket.disconnect(true);
    }
  });

  return io;
}

export function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
}
