
  window.overall_health = 0
  window.hit_accum =20
  window.hit_health = true
  window.health_build=0
  


  
  window.health_cooldown = false;
  window.health_build = 0;
  window.health_system_init = true;
  count_bar_done=false;

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

  ctx.fillStyle = "orange";
  ctx.beginPath();
  ctx.arc(10 + window.proj.x * minimapScale, 10 + window.proj.y * minimapScale, 4, 0, Math.PI * 2);
  ctx.fill();
}
const HIT_RADIUS = 20; // hit distance in world units

// Move projectile


if (window.proj.active) {

  ///for
  window.proj.x += Math.cos(window.proj.angle) * 0.00001;
  window.proj.y += Math.sin(window.proj.angle) * 0.00001;

  //count the ids
var count_health = 0
  // Check collision with players
  for (const id in window.allPlayers) {
    const p = window.allPlayers[id];
    
    
     
    if (p === player) continue; // skip shooter
    if (!p.health) p.health = 0;

    const dx = window.proj.x - p.x;
    const dy = window.proj.y - p.y;

    if (Math.sqrt(dx*dx + dy*dy) < HIT_RADIUS) {
      
      window.global_id=[id]
      p.health = 0; // decrease health
      //console.log("p.health",p.health)
      console.log(id)
      window.proj.active = false; // stop projectile
    
      window.health_cooldown = false;
     
      //console.log("count health", count_health)
      
      break;
    }
  }

  // Check collision with walls
  const tx = Math.floor(window.proj.x / tileSize);
  const ty = Math.floor(window.proj.y / tileSize);
  if (map[ty]?.[tx] === 1 || map[ty]?.[tx] === 2) window.proj.active = false;

  // Draw projectile on minimap
  window.x_all =10 + window.proj.x * minimapScale
  window.y_all=10 + window.proj.y * minimapScale
  ctx.fillStyle = "orange"; // drawing only
  ctx.beginPath();
  ctx.arc(10 + window.proj.x * minimapScale, 10 + window.proj.y * minimapScale, 4, 0, Math.PI * 2);
  ctx.fill();
}




  
  
//console.log("window.y_all",window.y_all)

  
//console.log("window.x_all",window.x_all)

//console.log("projectilex",window.proj.x)







  // Draw player
  ctx.fillStyle = "red";
//player.health = 0;

//console.log("window.proj.x,",window.proj.x)
//console.log("window.x_all",window.x_all)

for (const id in window.allPlayers) {
      count_health +=1
      const player = window.allPlayers[id];
      //player.health = window.overall_health 
        //player.health =100
              /*      ctx.beginPath();
            ctx.arc(
              10 + player.x * minimapScale,
              10 + player.y * minimapScale,
              5,
              0,
              Math.PI * 2
            );
            ctx.fill();*/


            ///detecting it but wont substract

    // Add this variable outside your game loop


// Then your condition
for (const id in window.allPlayers) {
  const player = window.allPlayers[id];
  window.global_player = player;
  //console.log("player.x",player.x)
  // EXCLUDE the current local player (replace 'window.myPlayerId' with your actual id variable)
  if (window.myPlayerId !== undefined && id === String(window.myPlayerId)) {}

  // Draw player
  ctx.beginPath();
  ctx.arc(
    10 + player.x * minimapScale,
    10 + player.y * minimapScale,
    5,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // Health decrease

  
  if (
     !window.health_cooldown && window.health_build <= 17
  ) {
    window.health_build += 1;
    window.overall_health = 10 * window.health_build;
    window.health_cooldown = true;
  }
}
//console.log("window.proj.x",window.proj.x)
//console.log("window.proj.y",window.proj.y)

            /*
            if((player.x>500)){
               player.health = 50
              
            }
            else{
              player.health = 0
            }*/
            
            //player.health=50;
      //console.log(`Player ${id}: x=${player.x}, y=${player.y}`);
    //  console.log("Player.x",player.x)
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
//console.log(player.x,"playerx")
window.proj.x = player.x;
      window.proj.y = player.y;
     // console.log("player the correct one is ,",player.x)
      window.proj.angle = player.angle;
if (!window.proj) {
  window.proj = { x: -1, y: -1, angle: 0, active: false };
  addEventListener("keydown", (e) => {
    
      window.proj.active = true;
    if (e.code === "Space") {
      for (const id in window.allPlayers) {
  const other = window.allPlayers[id];
  if (other === window.global_player){}; // skip the current shooter
  
  if (
    window.x_all < (other.x + 500) && window.x_all > (other.x - 500) &&
    window.y_all < (other.y + 500) && window.y_all > (other.y - 500)
  ) {
    //window.health_cooldown = false;
    // ... any other effect/logic (like healing, pickup, etc) for other players only
  }
}
   
     // window.health_cooldown = false;
      
    }
  });
}

// Check if the projectile is near ANY other player (not the shooter)


const HIT_RADIUS = 20;
///another collision detection
// Move, collide (players + walls), draw projectile
if (window.proj.active) {
  window.proj.x += Math.cos(window.proj.angle) * 35;
  window.proj.y += Math.sin(window.proj.angle) * 35;

  // hit players (skip self), give default health if missing
  let hit = false;
  for (const id in window.allPlayers) {
    const p = window.allPlayers[id];
   // if (p.health == null) p.health = 0;
    if (p === player) hit=false;;

    const dx = window.proj.x - p.x, dy = window.proj.y - p.y;
    if (dx * dx + dy * dy < HIT_RADIUS * HIT_RADIUS) {
     // p.health = Math.max(0, p.health - 0);
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
  //if (p.health == null) p.health = 0;
//  p.health = 0

  // player dot
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(10 + p.x * minimapScale, 10 + p.y * minimapScale, 5, 0, Math.PI * 2);
  ctx.fill();

  // health bar above dot
  const barW = 22, barH = 3, ratio = p.health / 100;
  const barX = 10 + p.x * minimapScale - barW / 2;
  const barY = 10 + p.y * minimapScale - 10;
//  ctx.fillStyle = "black";
//  ctx.fillRect(barX, barY, barW-50, barH);
//  ctx.fillStyle = "lime";
//  ctx.fillRect(barX, barY, barW * ratio-50, barH);
}
