function castRays(player) {
  viewx=canvas.width/2;
  viewy=0;
  vieww=canvas.width
  viewh=canvas.height;
  ctx.rect(canvas.width/2,0,canvas.width,canvas.height);
  ctx.clearRect(0,0,canvas.width/2,canvas.height);
  const rayStep = 3; // Cast a ray every 3 pixels (increased for performance)
  const numRays = Math.floor(canvas.width / rayStep);
  const angleStep = fov / numRays;
  let rayAngle = player.angle - fov/2;
  for (let rayIdx = 0; rayIdx < numRays; rayIdx++) {
    let i = rayIdx * rayStep;
    let sin = Math.sin(rayAngle);
    let cos = Math.cos(rayAngle);
    let dist = 0;
    let hit = false;
    var pic_dist = 0;
    while (!hit && dist < 1000) {
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
        // Enemy image drawing removed from raycasting loop for performance
      }
    }
    let wallHeight =  20000/dist 
    let shade = 255 - dist *1.5;
   //fov=lerp(fov,fov +Math.cos(dist),0.0001);
    function hyperbolic_level(){
      if(dist%2==0){
            fov=lerp( fov,Math.PI*2,0.0001);
          //  fov=Math.PI*2
          }
          else{
            fov =lerp( fov,Math.PI/3,0.0001);
      // fov=Math.PI*2
    }
   
    
    }
   // hyperbolic_level();
        
     math_testing();
 
    // Check if enemy.png is visible for this ray and positions to center of the screen.
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
    // Draw a wider wall slice to fill the gap
    for (let w = 0; w < rayStep; w++) {
      
 
    //  canvas.width = 1000;
    //  canvas.height = 1000;
     // ctx.clearRect(0, 0, canvas.width, canvas.height);
      //y= mx+b
        //slope level
        //y-mx=b (intercept)


////////EXTRA LEVELS/////////////////////////////////////////////////////////////////////////////////////////////////////////
    //original
    art( wallHeight, shade, movement, i + w, f_y1, o_y1)

    //spiral (warnign could case epilepsy)
    //art( wallHeight, shade, movement, i + w, f_y1, o_y1).spiralDrawFullScreen(wallHeight, shade, movement*2, i)

    //hyperbolic_1
    //art( wallHeight*1.5, shade*15, movement, i + w, f_y1, o_y1).hyperbolic_level()

    //hyperbolic(1.5)
    // art( wallHeight+Math.sqrt(i**2+w**2)/(wallHeight/55), shade, movement, i + w, f_y1, o_y1)

    //slope level
     //art( wallHeight+(w-1/w-i-1/i), shade, movement, i + w, f_y1, o_y1)

 
      
    //kaleidoscope
     // art( wallHeight, shade, movement, i + w, f_y1, o_y1).kaleidoDraw(i, f_y1, 1, wallHeight);
        

     //line level.
     /*
    if(i%4==0){

      art( wallHeight, shade, movement, i + w, f_y1, o_y1)
    }*/
     


    //hyperbolic version 2
    // art( wallHeight+Math.abs((i**2/a**2 - w**2/b**2)/5 -1), shade, movement, i + w, f_y1, o_y1)

    //hyperbolic version 3 
    //art( wallHeight*Math.abs((i**2/a**2 - w**2/b**2)/2505 -1), shade, movement, i + w, f_y1, o_y1)
     
    //I suppose here i and w are able to act as x and y. since x and y are just accumulations in this case. maybe conditional statement of w+2 and i+2 is not undefined can be the
    //second point 
      
    }
////////EXTRA LEVELS/////////////////////////////////////////////////////////////////////////////////////////////////////////
    /*
      a=25
      b=25
   
     // canvas.width = 1000;
     // canvas.height = 1000;
     // ctx.clearRect(0, 0, canvas.width, canvas.height);
      //y= mx+b
      for(let x=-550;x<600;x++){
        for(let y=-550;y<600;y++){
          ctx.fillStyle = "red";
          if(Math.abs((x**2/a**2 - y**2/a**2) -1)<0.5){
            ctx.fillStyle = "blue";
             ctx.fillRect(x+canvas.width/2,y+canvas.height/2,1,1);
          }
         
        }
      }*/
    //for loop here
   // ctx.beginPath();

   //make sure players do not go out of bounds
    rayAngle = rayAngle + angleStep
    player.x = Math.max(tileSize, Math.min(player.x, (map[0].length - 1) * tileSize - 1));
    player.y = Math.max(tileSize, Math.min(player.y, (map.length - 1) * tileSize - 1));
    player2.x = Math.max(tileSize, Math.min(player2.x, (map[0].length - 1) * tileSize - 1));
    player2.y = Math.max(tileSize, Math.min(player2.y, (map.length - 1) * tileSize - 1));
    player_other.x = Math.max(tileSize, Math.min(player_other.x, (map[0].length - 1) * tileSize - 1));
    player_other.y = Math.max(tileSize, Math.min(player_other.y, (map.length - 1) * tileSize - 1));
  }

// Step 1: Clear all old player tiles (set all 2s back to 0)
for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    if (map[y][x] === 2) {
      map[y][x] = 0;
        const screenX = x * tileSize; // or scaled if you have minimapScale
        const screenY = y * tileSize;

        //the position where you draw
        ctx.drawImage(enemyImg, screenX, screenY, tileSize, tileSize);
    }
  }
}
const enemyImg = new Image();
enemyImg.src = 'enemy.png'; // Load once at script start
function isLineOfSightClear(player, enemy, map, tileSize) {
  const dx = enemy.x - player.x;
  const dy = enemy.y - player.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // Normalize direction vector
  const stepX = dx / dist;
  const stepY = dy / dist;

  // Step along the line from player to enemy in small increments
  const stepSize = 0.1; // tweak for accuracy vs performance
  for (let i = 0; i < dist; i += stepSize) {
    const testX = player.x + stepX * i;
    const testY = player.y + stepY * i;

    // Convert position to map grid indices
    const mapX = Math.floor(testX / tileSize);
    const mapY = Math.floor(testY / tileSize);

    // Check for map bounds
    if (mapY < 0 || mapY >= map.length || mapX < 0 || mapX >= map[0].length) {
      return false; // out of map bounds => no clear line of sight
    }

    // Check if the current tile is a wall
    if (map[mapY][mapX] === 1) {
      return false; // blocked by wall
    }
  }
  return true; // no walls blocking
}

function drawEnemies3D(player) {
  const FOV = player.fov || (Math.PI / 3); // your FOV value

  // Collect enemies to depth-sort
  const enemies = [];

  for (const id in window.allPlayers) {
    const enemy = window.allPlayers[id];
    if (enemy === player) continue;  // Skip local player

    enemies.push(enemy);
  }

  // Sort enemies back-to-front (farther first)
  enemies.sort((a, b) => {
    const da = (a.x - player.x) ** 2 + (a.y - player.y) ** 2;
    const db = (b.x - player.x) ** 2 + (b.y - player.y) ** 2;
    return db - da;
  });

  for (const enemy of enemies) {
    const dx = enemy.x - player.x;
    const dy = enemy.y - player.y;

    let angleToEnemy = Math.atan2(dy, dx) - player.angle;
    // Normalize angle to [-PI, PI]
    if (angleToEnemy < -Math.PI) angleToEnemy += 2 * Math.PI;
    if (angleToEnemy > Math.PI) angleToEnemy -= 2 * Math.PI;
    

    if ((angleToEnemy) > FOV / 2) continue; // Outside FOV
    if (!isLineOfSightClear(player, enemy, map, tileSize)) continue;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    // You can add line-of-sight / wall occlusion checks here if you want

    // Projection parameters:
    const spriteHeight = 5000 / dist; // scale sprite size by distance, tweak as needed
    const spriteWidth = spriteHeight * (enemyImg.width / enemyImg.height);
    const screenX = (angleToEnemy + FOV / 2) / FOV * canvas.width;

    const screenY = (canvas.height / 2) - (spriteHeight / 2);

    if (enemyImg.complete) {
      ctx.drawImage(enemyImg, screenX - spriteWidth / 2, screenY, spriteWidth, spriteHeight);
    }
  }
}

// In your main render loop, after casting rays and drawing walls:
//castRays(player);
drawEnemies3D(player);

// Step 2: Loop through other players and mark their current position
/*for (const id in window.allPlayers) {
  const player = window.allPlayers[id];

  // Skip local player
  if (player === window.myPlayer) continue;

  const currTileX = Math.floor(player.x / tileSize);
  const currTileY = Math.floor(player.y / tileSize);
const enemyImg = new Image();
enemyImg.src = 'enemy.png'; // make sure the path is correct!


// Make sure to call drawMapAndEnemies() inside your main render loop,
// after updating the map with player positions.

  // Optional safety check
  if (map[currTileY]?.[currTileX] === 0) {
    map[currTileY][currTileX] = 2;
  }
}
*/


  //here is the logic where i submit the tiles


  drawMinimap(player);
  drawMinimap(player2);

  // --- Draw enemy image ONCE per frame if visible ---
  const dx = player_other.x - player.x;
  const dy = player_other.y - player.y;
  const distToEnemy = Math.sqrt(dx * dx + dy * dy);
  const angleToSprite = Math.atan2(dy, dx) - player.angle;
  let relativeAngle = angleToSprite;
  while (relativeAngle < -Math.PI) relativeAngle += 2 * Math.PI;
  while (relativeAngle > Math.PI) relativeAngle -= 2 * Math.PI;
  const halfFOV = player.fov / 2;
  if (Math.abs(relativeAngle) < halfFOV) {
    // Stepwise LOS check (like bullet logic)
    let losBlocked = false;
    let steps = Math.ceil(distToEnemy / 2); // 2 pixels per step
    for (let s = 1; s < steps; s++) {
      let t = s / steps;
      let testX = player.x + (player_other.x - player.x) * t;
      let testY = player.y + (player_other.y - player.y) * t;
      let mapX = Math.floor(testX / tileSize);
      let mapY = Math.floor(testY / tileSize);
      if (map[mapY]?.[mapX] === 1) {
        losBlocked = true;
        break;
      }
    }
    

    if (!losBlocked) {
      const spriteScale = 30000 / distToEnemy;
      const spriteAspect = enemyImg.width / enemyImg.height;
      const spriteHeight = spriteScale;
      const spriteWidth = spriteScale * spriteAspect;
      const screenX = (relativeAngle + halfFOV) / player.fov * canvas.width;
      const screenY = (canvas.height - spriteHeight) / 2;
      /*ctx.drawImage(
        enemyImg,
        0, 0, enemyImg.width, enemyImg.height,
        screenX - spriteWidth / 2, screenY,  // center the image
        spriteWidth, spriteHeight
      );*/
      // Overlay a semi-transparent black rectangle to darken the sprite
      //ctx.fillStyle = 'rgba(0,0,0,0.55)';
      //ctx.fillRect(screenX - spriteWidth / 2, screenY, spriteWidth, spriteHeight);
    }
  
  }
}