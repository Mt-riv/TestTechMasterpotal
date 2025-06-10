import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes can be added here if needed
  // All educational content is served statically from the client

  const httpServer = createServer(app);

  return httpServer;
}
