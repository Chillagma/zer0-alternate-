console.log("[SERVER] online_multiplayer.js script started");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve your HTML and JS files
app.use(express.static(__dirname));

// Store player states by socket id
let players = {};

io.on("connection", (socket) => {
  console.log("[SERVER] New client connected:", socket.id);
  console.log("[SERVER] Total clients:", Object.keys(io.sockets.sockets).length);

  // Send current players to the new client
  socket.emit("players_update", players);

  // When a player updates their state
  socket.on("player_update", (state) => {
    console.log(`[SERVER] Received player_update from ${socket.id}:`, state);
    players[socket.id] = state;
    // Broadcast all player states to everyone
    io.emit("players_update", players);
  });

  socket.on("disconnect", () => {
    console.log("[SERVER] Client disconnected:", socket.id);
    delete players[socket.id];
    io.emit("players_update", players);
    console.log("[SERVER] Total clients after disconnect:", Object.keys(io.sockets.sockets).length);
  });
});

server.listen(3000, (err) => {
  if (err) {
    console.error("[SERVER] Failed to start server:", err);
  } else {
    console.log("Server running at http://localhost:3000");
  }
});
