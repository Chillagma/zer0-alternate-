function handleProjectilesAndDraw() {
  const minimapScale = 0.2;

  for (let i = projectiles.length - 1; i >= 0; i--) {
   the=p;
    var p = projectiles[i];

    // Move bullet
    p.x += p.dx;
    p.y += p.dy;

    // Check map collision
    let mapX = Math.floor(p.x / tileSize);
    let mapY = Math.floor(p.y / tileSize);
    if (map[mapY]?.[mapX] === 1) {
      projectiles.splice(i, 1); // Remove bullet on wall hit
      ctx.fillRect(p.x - 2, p.y - 2, 4, 4); // Draw hit point
      continue;
    }

    // Draw on main view
  
    // Draw on minimap
    ctx.fillStyle = "orange";
    ctx.fillRect(
      10 + p.x * minimapScale - 2,
      10 + p.y * minimapScale - 2,
      4,
      4
    );
  }
}