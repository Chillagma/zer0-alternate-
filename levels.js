 const map2 = [
      [1,1,1,1,1],
      [1,0,0,0,1],
      [1,0,2,0,1],
      [1,0,0,0,1],
      [1,1,1,1,1],
    ];


      function drawCirclePoint(ctx, i, radius, centerX, centerY) {
  let angle = (i / canvas.width) * 2 * Math.PI;
  let x1 = centerX + Math.cos(angle) * radius;
  let y1 = centerY + Math.sin(angle) * radius;
  ctx.fillRect(x1, y1, 2, 2);
}

function computeSpiral(i, wallHeight, centerX, centerY) {
  let angle = (i / canvas.width) * 2 * Math.PI;
  let spiralRadius = (10 + i * 0.5) * (200 / wallHeight);
  let spiralAngle = angle + i * 0.02;
  let spiralX = centerX + Math.cos(spiralAngle) * spiralRadius;
  let spiralY = centerY + Math.sin(spiralAngle) * spiralRadius;
  return { spiralX, spiralY };
}

function drawSpiralWall(ctx, spiralX, spiralY, f_y1, centerY, shade, wallHeight) {
  let spiralWallX = spiralX;
  let spiralWallY = spiralY + (f_y1 - centerY) * 0.5;
  ctx.fillStyle = `rgb(0,0,${shade})`;
  ctx.globalAlpha = 1;
  ctx.fillRect(spiralWallX, spiralWallY, 2, wallHeight);
}
