const { Server } = require("socket.io");
const io = new Server(3000);

let players = {};

io.on("connection", (socket) => {
  console.log("New player connected:", socket.id);

  players[socket.id] = { x: 100, y: 100 };

  socket.emit("currentPlayers", players);
  socket.broadcast.emit("newPlayer", { id: socket.id, x: 100, y: 100 });

  socket.on("playerMovement", (movementData) => {
    players[socket.id].x = movementData.x;
    players[socket.id].y = movementData.y;
    socket.broadcast.emit("playerMoved", { id: socket.id, x: movementData.x, y: movementData.y });
  });

  socket.on("disconnect", () => {
    console.log("Player disconnected:", socket.id);
    delete players[socket.id];
    io.emit("playerDisconnected", socket.id);
  });
});

console.log("Server started on port 3000");