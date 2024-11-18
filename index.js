import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";
const app = express();
const server = createServer(app);
const io = new Server(server);
const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  // Join a room
  socket.on("joinRoom", (roomName) => {
    socket.join(roomName);
    console.log(`${socket.id} joined room: ${roomName}`);
    socket
      .to(roomName)
      .emit("message", `User ${socket.id} has joined the room.`);
  });

  // Handle messages in a room
  socket.on("sendMessage", ({ roomName, message }) => {
    console.log(`Message to room ${roomName}: ${message}`);
    io.to(roomName).emit("message", `Server's response: ${message}`);
  });

  // Leave a room
  socket.on("leaveRoom", (roomName) => {
    socket.leave(roomName);
    console.log(`${socket.id} left room: ${roomName}`);
    socket.to(roomName).emit("message", `User ${socket.id} has left the room.`);
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
