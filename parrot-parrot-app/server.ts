import { initSocket } from "@/lib/socketServer";
import express from "express";
import { createServer } from "http";
import next from "next";
import { NEXT_URL } from "@/lib/env";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const expressApp = express();
  const server = createServer(expressApp);

  // Attach Socket.IO
  initSocket(server);

  // Handle Next.js pages/api routes
  expressApp.use((req: express.Request, res: express.Response) => {
    return handle(req, res);
  });

  server.listen(3000, () => {
    console.log(`> Ready on ${NEXT_URL}`);
  });
});
