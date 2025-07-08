
// now you can use socket.on(), socket.emit(), etc.
var canvas = document.getElementById("game");
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
let player = { x: 150, y: 150, angle: 0,   fov: Math.PI / 3, health: 100, maxHealth: 100 };
let player2= { x: 150, y: 150, angle: 0 };
let player_other = { x: 300, y: 350, angle: 20, fov: Math.PI *2, health: 100, maxHealth: 100 };
let prevPlayerTileX = Math.floor(player_other.x / tileSize);
let prevPlayerTileY = Math.floor(player_other.y / tileSize);
const fov = Math.PI / 3;
var speed = 2 ;
const keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);
let aiAngle = 0;
let aiTimer = 0;
// For AI shooting
let aiShootTimer = 0;
const aiProjectiles = [];

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
      dy: Math.sin(player.angle) * 5
    });
    count = 0;
  }
});

const originalCastRays = castRays;
function castRays(player) {
  viewx=canvas.width/2;
  viewy=0;
  vieww=canvas.width
  viewh=canvas.height;
  ctx.rect(canvas.width/2,0,canvas.width,canvas.height);
  ctx.clearRect(0,0,canvas.width/2,canvas.height);
  const numRays = canvas.width;
  const angleStep = fov / numRays;
  let rayAngle = player.angle - fov/2;
  for (let i = 0; i < numRays; i++) {
    let sin = Math.sin(rayAngle);
    let cos = Math.cos(rayAngle);
    let dist = 0;
    let hit = false;
    var pic_dist = 0;
    while (!hit && dist < 10000) {
      dist += 1;
      var rayX = player.x + cos * dist;
      var rayY = player.y + sin * dist;
      var mapX1 = Math.floor(rayX / tileSize);
      var mapY1 = Math.floor(rayY / tileSize);
      var mapX2 = Math.floor((player2.x + cos * dist * Math.cos(player2.x / 60)) / tileSize);
      var mapY2 = Math.floor((player2.y + sin * dist * Math.sin(player2.y / 60)) / tileSize);
      if ((map[mapY1]?.[mapX1] === 1) || (map[mapY2]?.[mapX2] === 1)){
        hit = true;
      }
      var mapX3 = Math.floor((player_other.x + cos * dist) / tileSize);
      var mapY3 = Math.floor((player_other.y + sin * dist ) / tileSize);
      if((map[mapY1]?.[mapX1] === 2)&&dist<100){
        const wallHeight = 20000 / dist;
        i+=3
        let imageDrawn = false;
        if (!imageDrawn && map[mapY1][mapX1] === 2) {
          imageDrawn = true;
          const spriteDist = dist;
          const spriteScale = 30000 / spriteDist;
          const spriteAspect = enemyImg.width / enemyImg.height;
          const spriteHeight = spriteScale;
          const spriteWidth = spriteScale * spriteAspect;
          const dx = player_other.x - player.x;
          const dy = player_other.y - player.y;
          const angleToSprite = Math.atan2(dy, dx) - player.angle;
          let relativeAngle = angleToSprite;
          while (relativeAngle < -Math.PI) relativeAngle += 2 * Math.PI;
          while (relativeAngle > Math.PI) relativeAngle -= 2 * Math.PI;
          const halfFOV = player.fov / 2;
          if (Math.abs(relativeAngle) < halfFOV) {
            const screenX = (relativeAngle + halfFOV) / player.fov * canvas.width;
            const screenY = (canvas.height - spriteHeight) / 2;
            ctx.drawImage(
              enemyImg,
              0, 0, enemyImg.width, enemyImg.height,
              screenX - spriteWidth / 2, screenY,  // center the image
              spriteWidth, spriteHeight
            );
            // Overlay a semi-transparent black rectangle to darken the sprite
            ctx.fillStyle = 'rgba(0,0,0,0.55)';
            ctx.fillRect(screenX - spriteWidth / 2, screenY, spriteWidth, spriteHeight);
          }
        }
      }
    }
    let wallHeight =  20000/dist 
    let shade = 255 - dist *1.5;
    // Check if enemy.png is visible for this ray
    let enemyOnScreen = false;
    const dx = player_other.x - player.x;
    const dy = player_other.y - player.y;
    const angleToSprite = Math.atan2(dy, dx) - player.angle;
    let relativeAngle = angleToSprite;
    while (relativeAngle < -Math.PI) relativeAngle += 2 * Math.PI;
    while (relativeAngle > Math.PI) relativeAngle -= 2 * Math.PI;
    const halfFOV = player.fov / 2;
    if (Math.abs(relativeAngle) < halfFOV) {
      enemyOnScreen = true;
    }
    if (enemyOnScreen) shade -= 155;
    var f_y1 = (canvas.height - wallHeight) - 700 + (i / 25.5);
    var f_y2 =  wallHeight- (i / 25.5) +150;
    var o_y1=(canvas.height - wallHeight)/2
    art(wallHeight,shade,movement,i,f_y1,o_y1);
    ctx.beginPath();
    rayAngle =rayAngle + angleStep;
    player.x = Math.max(tileSize, Math.min(player.x, (map[0].length - 1) * tileSize - 1));
    player.y = Math.max(tileSize, Math.min(player.y, (map.length - 1) * tileSize - 1));
    player2.x = Math.max(tileSize, Math.min(player2.x, (map[0].length - 1) * tileSize - 1));
    player2.y = Math.max(tileSize, Math.min(player2.y, (map.length - 1) * tileSize - 1));
    player_other.x = Math.max(tileSize, Math.min(player_other.x, (map[0].length - 1) * tileSize - 1));
    player_other.y = Math.max(tileSize, Math.min(player_other.y, (map.length - 1) * tileSize - 1));
  }
  let currTileX = Math.floor(player_other.x / tileSize);
  let currTileY = Math.floor(player_other.y / tileSize);
  if ((currTileX !== prevPlayerTileX || currTileY !== prevPlayerTileY) && map[currTileY]?.[currTileX] === 0) {
    map[prevPlayerTileY][prevPlayerTileX] = 0;
    map[currTileY][currTileX] = 2;
    prevPlayerTileX = currTileX;
    prevPlayerTileY = currTileY;
  }
  drawMinimap(player);
  drawMinimap(player_other);
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
    proj.x += proj.dx;
    proj.y += proj.dy;
    if (
      proj.x < 0 || proj.x > canvas.width ||
      proj.y < 0 || proj.y > canvas.height
    ) {
      projectiles.splice(i, 1);
      continue;
    }
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
      const projDx = proj.x - player.x;
      const projDy = proj.y - player.y;
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
          continue;
        }
      }
    }
  }
  updatePlayer();
  castRays(player);
  ctx.fillStyle = 'orange';
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
  const playerBarWidth = 300;
  const playerBarHeight = 40;
  const playerBarX = canvas.width - playerBarWidth - 50;
  const playerBarY = 40;
  ctx.fillStyle = 'black';
  ctx.fillRect(playerBarX - 4, playerBarY - 4, playerBarWidth + 8, playerBarHeight + 8);
  ctx.fillStyle = 'red';
  ctx.fillRect(playerBarX, playerBarY, playerBarWidth, playerBarHeight);
  ctx.fillStyle = 'lime';
  ctx.fillRect(playerBarX, playerBarY, playerBarWidth * (player.health / player.maxHealth), playerBarHeight);
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 4;
  ctx.strokeRect(playerBarX - 4, playerBarY - 4, playerBarWidth + 8, playerBarHeight + 8);
  ctx.font = 'bold 32px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText('HEALTH', playerBarX, playerBarY - 16);
  if (player_other.health <= 0) {
    let openTiles = [];
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[0].length; x++) {
        if (map[y][x] === 0) openTiles.push({x, y});
      }
    }
    if (openTiles.length > 0) {
      const spawn = openTiles[Math.floor(Math.random() * openTiles.length)];
      player_other.x = spawn.x * tileSize + tileSize / 2;
      player_other.y = spawn.y * tileSize + tileSize / 2;
    } else {
      player_other.x = 300;
      player_other.y = 350;
    }
    player_other.health = player_other.maxHealth;
  }
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
  ctx.strokeRect(enemyBarX - 4, enemyBarY - 4, enemyBarWidth + 8, enemyBarHeight + 8);
  ctx.font = 'bold 32px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText('ENEMY HEALTH', enemyBarX, enemyBarY - 16);
  updateAIPlayer(dt);
  enemyAnimator.draw(ctx);
  requestAnimationFrame(loop);
}

loop();
