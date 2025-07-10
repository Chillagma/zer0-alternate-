/**
 * Handles player movement and emits player state to the server.
 * Listens for updates from the server about all players.
 */

// Assume 'player', 'player2', 'keys', 'speed', and 'window.socket' are defined globally

function updatePlayer(player) {
  let speed_2 = 2;

  // Handle rotation
  if (keys['a']) {
    player.angle -= 0.05 / speed_2;
  }
  if (keys['d']) {
    player.angle += 0.05 / speed_2;
  }

  // Handle movement
  if (keys['w']) {
    player.x += Math.cos(player.angle) * speed;
    player.y += Math.sin(player.angle) * speed;
    // Optionally update player2 if needed
  }
  if (keys['s']) {
    player.x -= Math.cos(player.angle) * speed;
    player.y -= Math.sin(player.angle) * speed;
    // Optionally update player2 if needed
  }

  // Emit updated player state to the server
  if (window.socket) {
    window.socket.emit('player_update', {
      x: player.x,
      y: player.y,
      z: player.z || 0,
      angle: player.angle
    });
    // Log the local socket ID for debugging
    window.socket.on('all_players', function(players) {
    // 'players' is expected to be an object mapping socket IDs to player states
    // Example: { "socketId1": {x, y, angle, ...}, "socketId2": {...}, ... }
    console.log("All players' states:", players);

    // You can update your local representation of other players here
    // For example:
    // for (const [id, state] of Object.entries(players)) {
    //   if (id !== window.socket.id) {
    //     // Update other players' positions in your game
    //   }
    // }
  });
  //  console.log("socket id: is", window.socket.id);
  }
}

// Listen for updates about all players from the server
if (window.socket) {
  
}