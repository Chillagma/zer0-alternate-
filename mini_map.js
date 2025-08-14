


function drawMinimap(player) {
  const minimapScale = 0.2; 
  const minimapTileSize = tileSize * minimapScale;
  const minimapWidth = map[0].length * minimapTileSize;
  const minimapHeight = map.length * minimapTileSize;

  // Draw minimap background
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.fillRect(10, 10, minimapWidth, minimapHeight);

  // Draw map tiles
 for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[0].length; x++) {
    if (map[y][x] === 1) {
      ctx.fillStyle = "white";
    } else if (map[y][x] === 2) {
      ctx.fillStyle = "orange";
    } else {
      ctx.fillStyle = "black";
    }
    
    ctx.fillRect(
      10 + x * minimapTileSize,
      10 + y * minimapTileSize,
      minimapTileSize,
      minimapTileSize
    );
  }
 // console.log(window.xyz)
}

  // Draw rays for player
  const numRays = 30; // or use canvas.width for full density
  const rayStep = fov / numRays;
  let rayAngle = player.angle - fov / 2;
  ctx.strokeStyle = "yellow";
  ctx.lineWidth = 1;

  for (let i = 0; i < numRays; i++) {
    let sin = Math.sin(rayAngle);
    let cos = Math.cos(rayAngle);
    let dist = 0;
    let hitX = player.x;
    let hitY = player.y;

    while (dist < 10000) {
      dist += 1;
      let testX = Math.floor((player.x + cos * dist) / tileSize);
      let testY = Math.floor((player.y + sin * dist) / tileSize);

      if (map[testY]?.[testX] === 1 || map[testY]?.[testX] === 2) {
        hitX = player.x + cos * dist;
        hitY = player.y + sin * dist;
        break;
      }
      if(player==player_other){
      //  map[testY][testX] = 2; // Clear the tile if player_other hits it

      }
    }

    // Draw ray on minimap
    ctx.beginPath();
    ctx.moveTo(
      10 + player.x * minimapScale,
      10 + player.y * minimapScale
    );
    ctx.lineTo(
      10 + hitX * minimapScale,
      10 + hitY * minimapScale
    );
    ctx.stroke();

    rayAngle += rayStep;
  }
  
    
  
  // Draw player
  ctx.fillStyle = "red";
  for (const id in window.allPlayers) {
          const player = window.allPlayers[id];
                        ctx.beginPath();
                ctx.arc(
                  10 + player.x * minimapScale,
                  10 + player.y * minimapScale,
                  5,
                  0,
                  Math.PI * 2
                );
                ctx.fill();
          //console.log(`Player ${id}: x=${player.x}, y=${player.y}`);
        }
 /* ctx.beginPath();
  ctx.arc(
    10 + player.x * minimapScale,
    10 + player.y * minimapScale,
    5,
    0,
    Math.PI * 2
  );
  ctx.fill();*/
  //console.log(window.x_pos)
  //console.log(window.y_pos)

  // Draw direction
  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.moveTo(
    10 + player.x * minimapScale,
    10 + player.y * minimapScale
  );
  ctx.lineTo(
    10 + (player.x + Math.cos(player.angle) * 20) * minimapScale,
    10 + (player.y + Math.sin(player.angle) * 20) * minimapScale
  );
  ctx.stroke();
}