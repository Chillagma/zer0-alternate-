


function drawMinimap(player) {
  const minimapScale = 0.2; 
  const minimapTileSize = tileSize * minimapScale;
  const minimapWidth = map[0].length * minimapTileSize;
  const minimapHeight = map.length * minimapTileSize;

  // Draw minimap background
  ctx.fillStyle = "rgba(182, 20, 20, 0.5)";
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
  




// Declare projectile vars globally
// Projectile vars
// Press space to shoot
if (!window.proj) {
  window.proj = {x: -1, y: -1, angle: 0, active: false};
  document.addEventListener("keydown", e => {
    if (e.code === "Space") {
      window.proj.x = player.x;
      window.proj.y = player.y;
      window.proj.angle = player.angle;
      window.proj.active = true;
    }
  });
}

// Move + draw projectile
if (window.proj.active) {
  window.proj.x += Math.cos(window.proj.angle) * 35;
  window.proj.y += Math.sin(window.proj.angle) * 35;

  let tx = Math.floor(window.proj.x / tileSize);
  let ty = Math.floor(window.proj.y / tileSize);
  if (map[ty]?.[tx] === 1 || map[ty]?.[tx] === 2) window.proj.active = false;

  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(10 + window.proj.x * minimapScale, 10 + window.proj.y * minimapScale, 4, 0, Math.PI * 2);
  ctx.fill();
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
// --- ONE BLOCK: projectile + player hits + health bars on minimap ---

// init once (safe if already done elsewhere)
if (!window.proj) {
  window.proj = { x: -1, y: -1, angle: 0, active: false };
  addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      window.proj.x = player.x;
      window.proj.y = player.y;
      window.proj.angle = player.angle;
      window.proj.active = true;
    }
  });
}

const HIT_RADIUS = 20;

// Move, collide (players + walls), draw projectile
if (window.proj.active) {
  window.proj.x += Math.cos(window.proj.angle) * 35;
  window.proj.y += Math.sin(window.proj.angle) * 35;

  // hit players (skip self), give default health if missing
  let hit = false;
  for (const id in window.allPlayers) {
    const p = window.allPlayers[id];
    if (p.health == null) p.health = 100;
    if (p === player) continue;

    const dx = window.proj.x - p.x, dy = window.proj.y - p.y;
    if (dx * dx + dy * dy < HIT_RADIUS * HIT_RADIUS) {
      p.health = Math.max(0, p.health - 10);
      window.proj.active = false;
      hit = true;
      break;
    }
  }

  // hit wall (only if not already hit a player)
  if (!hit) {
    const tx = Math.floor(window.proj.x / tileSize);
    const ty = Math.floor(window.proj.y / tileSize);
    if (map[ty]?.[tx] === 1 || map[ty]?.[tx] === 2) window.proj.active = false;
  }

  // draw projectile on minimap
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(10 + window.proj.x * minimapScale, 10 + window.proj.y * minimapScale, 4, 0, Math.PI * 2);
  ctx.fill();
}

// Draw players + health bars (defaults + clamp) — all here so bars always reflect hits
for (const id in window.allPlayers) {
  const p = window.allPlayers[id];
  if (p.health == null) p.health = 100;
  p.health = Math.max(0, Math.min(100, p.health));

  // player dot
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(10 + p.x * minimapScale, 10 + p.y * minimapScale, 5, 0, Math.PI * 2);
  ctx.fill();

  // health bar above dot
  const barW = 22, barH = 3, ratio = p.health / 100;
  const barX = 10 + p.x * minimapScale - barW / 2;
  const barY = 10 + p.y * minimapScale - 10;
  ctx.fillStyle = "black";
  ctx.fillRect(barX, barY, barW, barH);
  ctx.fillStyle = "lime";
  ctx.fillRect(barX, barY, barW * ratio, barH);
}
