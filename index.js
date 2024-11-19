import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import cluster from "node:cluster";
import { availableParallelism } from "node:os";
import { Server } from "socket.io";
import { createAdapter, setupPrimary } from "@socket.io/cluster-adapter";
import { setupMaster, setupWorker } from "@socket.io/sticky";

const __dirname = dirname(fileURLToPath(import.meta.url));

if (cluster.isPrimary) {
  const numCPUs = availableParallelism();

  console.log(`Primary process running. Forking ${numCPUs} workers...`);
  const app = express();
  const port = 3000; // Shared port for all workers

  const server = createServer(app);
  setupMaster(server, {
    loadBalancingMethod: "least-connection", // either "random", "round-robin" or "least-connection"
  });
  server.listen(port, () => {
    console.log(`Primary process listening on port ${port}`);
  });

  // Set up the primary cluster adapter
  setupPrimary();

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  // Worker processes
  const app = express();

  const server = createServer(app);
  const io = new Server(server, {
    connectionStateRecovery: {}, // Enables reconnection after disconnection
    adapter: createAdapter(), // Initialize the cluster adapter in workers
  });
  setupWorker(io);
  // Serve a simple HTML page
  app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "index.html"));
  });

  // WebSocket logic
  io.on("connection", (socket) => {
    console.log(`User connected to worker ${cluster.worker.id}: ${socket.id}`);

    socket.on("joinRoom", (roomName) => {
      socket.join(roomName);
      console.log(`${socket.id} joined room: ${roomName}`);
      socket.to(roomName).emit("message", `User ${socket.id} joined the room.`);
    });

    socket.on("sendMessage", ({ roomName, message }) => {
      io.to(roomName).emit("message", `Server: ${message}`);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
}
