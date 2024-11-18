import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("create-something", (message) => {
    console.log(`Message received: ${message}`);

    // Broadcast the message to all connected clients
    socket.broadcast.emit("message", message);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});

// explainination
// socket.broadcast.emit('hi');:
// socket represents a specific client connected to the server.
// broadcast is a property of the socket object that allows you to send a message to all clients except the one that sent the message.
// emit() is a method that sends an event to the client.
// In this case, socket.broadcast.emit('hi'); sends the event 'hi' to all clients except the one that sent the message.
// io.emit('message', msg);:
// io is an instance of the socket.io server.
// emit() is a method that sends an event to all connected clients.
// In this case, io.emit('message', msg); sends the event 'message' with the payload msg to all connected clients.
