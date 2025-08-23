
// now you can use socket.on(), socket.emit(), etc.

var canvas = document.getElementById("game");
//const dFrag = document.createDocumentFragment();
var ctx = canvas.getContext("2d");
var movement = 0;
var count = 0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load enemy image
const enemyImg = new Image();
enemyImg.src = "enemy.png";

enemyImg.onload = function() {
  // Draw the enemy image at the center of the 
  const x = (canvas.width - enemyImg.width) / 2;
  const y = (canvas.height - enemyImg.height) / 2;
  //ctx.drawImage(enemyImg, x, y);
  //requestAnimationFrame(enemyImg.onload);
};
 const map = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const tileSize = 64;
const projectiles = [];

let player = { x: Math.random() * 1050 + 150, y: Math.random() * 350 + 155, angle: 0,   fov: Math.PI / 3, health: 100, maxHealth: 100 };
let player2= { x: player.x, y: player.y, angle: 0 };
let player_other = { x: 300, y: 350, angle: 20, fov: Math.PI *2, health: 100, maxHealth: 100 };
let prevPlayerTileX = Math.floor(player_other.x / tileSize);
let prevPlayerTileY = Math.floor(player_other.y / tileSize);
var a =25
var b =25;
document.addEventListener("keydown", e => {
  if (e.code === "Space") {
    projectiles.push({
      x: player.x,
      y: player.y,
      dx: Math.cos(player.angle) * 5,
      dy: Math.sin(player.angle) * 5,
      ownerId: window.myPlayerId || 'playerMain'
    });
  }
});


var fov = Math.PI/3;

x= fov
y=fov
var i_count=0


var speed = 2 ;
const keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);
let aiAngle = 0;
let aiTimer = 0;
// For AI shooting
let aiShootTimer = 0;
const aiProjectiles = [];
var distance=Math.sqrt((player_other.x-player.x)*(player_other.x-player.x)+(player_other.y-player.y)*(player_other.y-player.y));
function math_testing(){
  //setInterval(math_testing,5000);
  /*
  console.log("this is player_other.x: " + player_other.x);
  console.log("this is player_other.y: " + player_other.y);
console.log("this is player.x: " + player.x);
console.log("this is player.y: " + player.y) 
console.log("this is distance"+distance);
//return distance;*/


}
document.addEventListener("keydown", e => {
  if (e.code === "Space") {
    // Create projectile relative to the player's map position
    projectiles.push({
      x: player.x,
      y: player.y,
      dx: Math.cos(player.angle) * 5,
      dy: Math.sin(player.angle) * 5,
      ownerId: window.myPlayerId || 'playerMain'
    });
  }
});

// Init projectile if not done yet
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

function updateProjectile() {
  if (!window.proj.active) return;

  window.proj.x += Math.cos(window.proj.angle) * 35;
  window.proj.y += Math.sin(window.proj.angle) * 35;

  // Player collision
  for (const id in window.allPlayers) {
    const p = window.allPlayers[id];
    if (p === player) continue; // don't hit self
    if (p.health == null) p.health = 100;

    if (Math.hypot(window.proj.x - p.x, window.proj.y - p.y) < 20) {
      p.health = Math.max(0, p.health - 10);
    //  console.log(`Hit ${id}, health = ${p.health}`);
      window.proj.active = false;
      return;
    }
  }

  // Wall collision
  const tx = Math.floor(window.proj.x / tileSize);
  const ty = Math.floor(window.proj.y / tileSize);
  if (map[ty]?.[tx] === 1 || map[ty]?.[tx] === 2) {
    window.proj.active = false;
  }
}



//ai movement
function updateAIPlayer(dt) {
  aiTimer -= dt;
  aiShootTimer -= dt;
  if (aiTimer <= 0 || Math.random() < 0.05) {
    aiAngle = Math.random() * Math.PI * 2;
    aiTimer = 0.5 + Math.random() * 1.5;
  }
  aiAngle += (Math.random() - 0.5) * 0.2;
  const aiSpeed = 0.75;
  const nextX = player_other.x + Math.cos(aiAngle) * aiSpeed;
  const nextY = player_other.y + Math.sin(aiAngle) * aiSpeed;
  const mapX = Math.floor(nextX / tileSize);
  const mapY = Math.floor(nextY / tileSize);
  if (map[mapY]?.[mapX] == 0|| map[mapY]?.[mapX] == 1|| map[mapY]?.[mapX] == 2) {
    player_other.x = nextX;
    player_other.y = nextY;
  } else {
    aiAngle = Math.random() * Math.PI * 2;
    aiTimer = 0.5 + Math.random();
  }
  if (aiShootTimer <= 0) {
    const dx = player.x - player_other.x;
    const dy = player.y - player_other.y;
    const angleToPlayer = Math.atan2(dy, dx);
    aiProjectiles.push({
      x: player_other.x,
      y: player_other.y,
      dx: Math.cos(angleToPlayer) * 5,
      dy: Math.sin(angleToPlayer) * 5
    });
    aiShootTimer = 0.4 + Math.random() * 0.3;
  }
}

document.addEventListener("keydown", e => {
  if (e.code === "Space") {
    projectiles.push({
      x: player.x,
      y: player.y,
      dx: Math.cos(player.angle) * 5,
      dy: Math.sin(player.angle) * 5,
      ownerId: window.myPlayerId || 'playerMain'
    });
    
  }
});

const originalCastRays = castRays;
function lerp(start, end, t) {
  return start + (end - start) * t;
}


const enemyAnimator = new OBJAnimator(
  3,
  i => i === 0 ? "enemy.obj" : `enemy${i+1}.obj`,
  1,    // animSpeed
  20,   // scaleFactor
  -200  // cameraZ
);

function loop() {


 
  const now = performance.now();
  let lastTime = now;
  const dt = (now - lastTime) / 1000;
  lastTime = now;
  for (let i = projectiles.length - 1; i >= 0; i--) {
    const proj = projectiles[i];
    // Stepwise bullet-enemy collision (like LOS logic)
    let prevX = proj.x - proj.dx;
    let prevY = proj.y - proj.dy;
    let steps = Math.ceil(Math.sqrt(proj.dx * proj.dx + proj.dy * proj.dy) / 2);
    let hitEnemy = false;
    // --- Check collision for allPlayers ---
    if (window.allPlayers) {
      let playerKeys = Object.keys(window.allPlayers);
      for (let pidx = 0; pidx < playerKeys.length; ++pidx) {
        const pid = playerKeys[pidx];
        const pl = window.allPlayers[pid];
        // (You may want to not damage yourself; skip local player if ids known)
        for (let s = 1; s <= steps; s++) {
          let t = s / steps;
          let bx = prevX + (proj.x - prevX) * t;
          let by = prevY + (proj.y - prevY) * t;
          // Treat players as circles (simple collision)
          let dx = bx - pl.x;
          let dy = by - pl.y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 32) { // 32 is hit radius; adjust as needed
            if (!(proj.ownerId && String(proj.ownerId) === String(pid))) {
              pl.health = Math.max(0, (pl.health || 100) - 20);
              projectiles.splice(i, 1);
              hitEnemy = true;
              break;
            }
          }
        }
        if (hitEnemy) break;
      }
    }
    // --- If not hit any allPlayers, check regular enemy logic (player_other) ---
    if (!hitEnemy) {
      for (let s = 1; s <= steps; s++) {
        let t = s / steps;
        let bx = prevX + (proj.x - prevX) * t;
        let by = prevY + (proj.y - prevY) * t;
        // Project enemy to screen
        const dx = player_other.x - player.x;
        const dy = player_other.y - player.y;
        const distToEnemy = Math.sqrt(dx * dx + dy * dy);
        const angleToSprite = Math.atan2(dy, dx) - player.angle;
        let relativeAngle = angleToSprite;
        while (relativeAngle < -Math.PI) relativeAngle += 2 * Math.PI;
        while (relativeAngle > Math.PI) relativeAngle -= 2 * Math.PI;
        const halfFOV = player.fov / 2;
        if (Math.abs(relativeAngle) < halfFOV) {
          const spriteScale = 30000 / distToEnemy;
          const spriteAspect = enemyImg.width / enemyImg.height;
          const spriteHeight = spriteScale;
          const spriteWidth = spriteScale * spriteAspect;
          const screenX = (relativeAngle + halfFOV) / player.fov * canvas.width;
          const screenY = (canvas.height - spriteHeight) / 2;
          // Project bullet to screen
          const projDx = bx - player.x;
          const projDy = by - player.y;
          const projDist = Math.sqrt(projDx * projDx + projDy * projDy);
          const projAngle = Math.atan2(projDy, projDx) - player.angle;
          let projRelAngle = projAngle;
          while (projRelAngle < -Math.PI) projRelAngle += 2 * Math.PI;
          while (projRelAngle > Math.PI) projRelAngle -= 2 * Math.PI;
          if (Math.abs(projRelAngle) < halfFOV) {
            const projScreenX = (projRelAngle + halfFOV) / player.fov * canvas.width;
            const projScreenY = (canvas.height - (30000 / projDist)) / 2;
            if (
              projScreenX >= screenX - spriteWidth / 2 &&
              projScreenX <= screenX + spriteWidth / 2 &&
              projScreenY >= screenY &&
              projScreenY <= screenY + spriteHeight
            ) {
              player_other.health = Math.max(0, player_other.health - 20);
              projectiles.splice(i, 1);
              hitEnemy = true;
              break;
            }
          }
        }
      }
    }
    if (hitEnemy) continue;
    proj.x += proj.dx;
    proj.y += proj.dy;
    if (
      proj.x < 0 || proj.x > canvas.width ||
      proj.y < 0 || proj.y > canvas.height
    ) {
      projectiles.splice(i, 1);
      continue;
    }
  }
  updatePlayer(player);
  updatePlayer(player2);
  //player shooting projectiles
  castRays(player);
  //castRays(player2);
  ctx.fillStyle = 'orange';
   updateProjectile() 
  for (let i = aiProjectiles.length - 1; i >= 0; i--) {
    const proj = aiProjectiles[i];
    proj.x += proj.dx;
    proj.y += proj.dy;
    if (
      proj.x < 0 || proj.x > canvas.width ||
      proj.y < 0 || proj.y > canvas.height
    ) {
      aiProjectiles.splice(i, 1);
      continue;
    }
    const dx = proj.x - player.x;
    const dy = proj.y - player.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 32) {
      player.health = Math.max(0, player.health - 20);
      aiProjectiles.splice(i, 1);
      continue;
    }
    ctx.beginPath();
    ctx.arc(proj.x, proj.y, 5, 0, 2 * Math.PI);
    ctx.fill();
  }
 
  updateAIPlayer(dt);
  enemyAnimator.draw(ctx);
  requestAnimationFrame(loop);

  // Loop through every player and draw their health bar
let index = 0; // to offset each bar vertically

for (const id in window.allPlayers) {

    const player = window.allPlayers[id];

    const barWidth = 150;
    const barHeight = 20;
    const barX = 20; // fixed left position
    const barY = 40 + index * (barHeight + 20); // stack bars down

    /*
    const enemyBarWidth = 300;
    const enemyBarHeight = 40;
    const enemyBarX = (canvas.width - enemyBarWidth) / 2;
    const enemyBarY = 40;
    ctx.fillStyle = 'black';
    ctx.fillRect(enemyBarX - 4, enemyBarY - 4, enemyBarWidth + 8, enemyBarHeight + 8);
    ctx.fillStyle = 'red';
    ctx.fillRect(enemyBarX, enemyBarY, enemyBarWidth, enemyBarHeight);
    ctx.fillStyle = 'lime';
    ctx.fillRect(enemyBarX, enemyBarY, enemyBarWidth * (player_other.health / (player_other.maxHealth || 1)), enemyBarHeight);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 4;
    ctx.strokeRect(enemyBarX - 4, enemyBarY - 4, enemyBarWidth + 8, enemyBarHeight + 8);*/
  ctx.font = 'bold 32px Arial';
  ctx.fillStyle = 'white';

    // Draw black background border
    ctx.fillStyle = 'black';
    ctx.fillRect(barX + canvas.width/7, barY - 4, barWidth + 8, barHeight + 8);

   
    // Draw green health portion
    var healthRatio = player.health / (player.maxHealth || 1);
    
    
    
// When you connect, socket.io gives you your id

   
    ctx.fillStyle = 'lime';
    ctx.fillRect(barX+ canvas.width/7, barY, barWidth , barHeight);

    // White outline
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.strokeRect(barX + canvas.width/7, barY - 4, barWidth + 8, barHeight + 8);

    // Player name / ID above bar
    ctx.font = '14px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(`Player ${id}`, barX+ canvas.width/7, barY - 6);

    index++; // move to next bar position
}

  
      a=25
      b=25
      document.addEventListener('mousemove', e => {
  // Distance from the **viewport’s** top‑left corner
  var mouse_x = e.clientX;
  var mouse_y = e.clientY;
  //console.log(`mouse: ${x}, ${y}`);
});
   
     // canvas.width = 1000;
     // canvas.height = 1000;
     // ctx.clearRect(0, 0, canvas.width, canvas.height);
      //y= mx+b
   
      /* function hyperbola(){
         count+=1;
         center_x=canvas.width/2;
         center_y=canvas.height/2;
      for(let x=-550;x<600;x++){
        for(let y=-550;y<600;y++){
          ctx.fillStyle = "red";
          if(Math.abs((x**2/a**2 - y**2/b**2) -1)<0.5){
            ctx.fillStyle = "blue"
           // 
             angle= Math.atan2(center_y-y,center_x-x);
           // ctx.restore();
             ctx.fillRect(x+canvas.width/2 +Math.cos(angle+count/5)*50,y+canvas.height/2,1+Math.cos(angle+count/50)*50,1);
          }
   
          if(Math.abs((a**2/x**2 + b**2/y**2) -1)<0.5){
            ctx.fillStyle = "blue"
           // 
             angle= Math.atan2(center_y-y,center_x-x);
           // ctx.restore();
             ctx.fillRect(x+canvas.width/2 +Math.cos(angle+count/5)*50,y+canvas.height/2,1+Math.cos(angle+count/50)*50,1);
          }
         
        }
      
      }
      }*/
    //  hyperbola();
     
      
    }
    
  
loop();
