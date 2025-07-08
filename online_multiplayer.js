const io = require("socket.io")(3000);

let players = {};

io.on("connection", (socket) => {
  console.log("New player connected:", socket.id);

  // Initialize player state
  players[socket.id] = { x: 100, y: 100 };

  // Send current players to this new player
  socket.emit("currentPlayers", players);

  // Broadcast new player to others
  socket.broadcast.emit("newPlayer", { id: socket.id, x: 100, y: 100 });

  // Listen for player movement
  socket.on("playerMovement", (movementData) => {
    players[socket.id].x = movementData.x;
    players[socket.id].y = movementData.y;
    // Broadcast movement to others
    socket.broadcast.emit("playerMoved", { id: socket.id, x: movementData.x, y: movementData.y });
  });

  socket.on("disconnect", () => {
    console.log("Player disconnected:", socket.id);
    delete players[socket.id];
    io.emit("playerDisconnected", socket.id);
  });
});

console.log("Server started on port 3000");