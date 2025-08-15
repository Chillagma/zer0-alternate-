
function handleProjectilesAndDraw() {

  const initialSize = 500;
  const duration = 5000; 
  const minimapScale = 0.2;
  const elapsed = performance.now();
  const shrinkFactor = Math.min(elapsed / duration, 1);
  var currentSize = initialSize * (1 - shrinkFactor);

  for (let i = projectiles.length - 1; i >= 0; i--) {
   
    var p = projectiles[i];

    // Move bullet
    //multiply by 15 later...
  //  p.x += p.dx*15;
  //  p.y += p.dy*15;

    p.x += p.dx*15;
    p.y += p.dy*15;
  var canvas_center_x=945;
    var canvas_center_y=420;
    // Check map collision
    let mapX = Math.floor(p.x / tileSize);
    let mapY = Math.floor(p.y / tileSize);
    if (map[mapY]?.[mapX] === 1) {
      projectiles.splice(i, 1); // Remove bullet on wall hit
   
       // Draw hit point
      continue;
    }

//think in 2d..
  count+=20;
  if (count < 500) {
      if (map[mapY]?.[mapX] === 0) {

          //var mapX1 = Math.floor((player.x + cos * dist) / tileSize);
            //var mapY1 = Math.floor((player.y + sin * dist) / tileSize);

      /* ctx.fillRect(
         Math.abs(canvas_center_x - count - p.x),
         Math.abs(canvas_center_y - count - p.y),
         Math.abs(500 - count - p.x),
         Math.abs(500 - count - p.y)
       );*/


      /*    ctx.fillRect(
         Math.abs( canvas_center_x ),
         Math.abs(canvas_center_y ),
         Math.abs(500-count),
         Math.abs(500-count)
       );*/
  
       // Draw hit point

    }
   // requestAnimationFrame(handleProjectilesAndDraw);
  }
    // Draw on main view
   
    // Draw on minimap
  ctx.fillStyle = "orange";
  ctx.fillRect(
    (10 + p.x * minimapScale - 2),
    10 + p.y * minimapScale - 2,
    4,
    4
  );
  
let startTime = performance.now();
  }
 requestAnimationFrame(handleProjectilesAndDraw);
}
let j = 0;

function drawNextShrinkStep() {
  if (j < 50) {
    if (map[mapY]?.[mapX] === 0) {
      ctx.fillRect(
        canvas_center_x - j * 5,
        canvas_center_y - j * 5,
        500 - j * 5,
        500 - j * 5
      );
    }
    j++;
    setTimeout(drawNextShrinkStep, 30); // 30 ms delay between steps
  }
}

drawNextShrinkStep();
 