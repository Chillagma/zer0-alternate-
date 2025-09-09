const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");

// Serve static files from your current folder
app.use(express.static(__dirname));

// Serve your HTML at the root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "the_copy.html"));
});

// Socket.IO logic
const players = {};
io.on("connection", (socket) => {
  console.log("Player connected:", socket.id);

  socket.emit("players_update", players);

  socket.on("player_update", (data) => {
    players[socket.id] = data;
    io.emit("players_update", players);
  });

  socket.on("disconnect", () => {
    delete players[socket.id];
    io.emit("players_update", players);
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log(`Server running on port ${PORT}`));
