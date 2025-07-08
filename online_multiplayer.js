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
  console.log("New client connected:", socket.id);

  // Send current players to the new client
  socket.emit("players_update", players);

  // When a player updates their state
  socket.on("player_update", (state) => {
    players[socket.id] = state;
    // Broadcast all player states to everyone
    io.emit("players_update", players);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    delete players[socket.id];
    io.emit("players_update", players);
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
