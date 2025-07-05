   function shooting_projectiles() {
              if (keys[' ']) {
              const shrinkDuration = 150; // ms to fully shrink
              if (!window.shrinkStart) window.shrinkStart = performance.now();
              let elapsed = performance.now() - window.shrinkStart;
              let shrink = Math.max(0, 1 - elapsed / shrinkDuration);

              // Calculate map area in pixels
              let mapWidth = map[0].length * tileSize;
              let mapHeight = map.length * tileSize;
              // Use the smaller dimension for scaling
              let baseSize = Math.min(mapWidth, mapHeight) / 4;

              let size = baseSize * shrink;
              let w = canvas.width / 2, h = canvas.height / 2;
              // Start at bottom right, move towards center as it shrinks
              let startX = canvas.width - baseSize;
              let startY = canvas.height - baseSize;
              let targetX = w - size;
              let targetY = h - size;
              // Interpolate position from bottom right to center
              var x = startX * shrink + targetX * (1 - shrink);
              var y = startY * shrink + targetY * (1 - shrink);
              ctx.fillStyle = "cyan";
              ctx.fillRect(x, y, 22, 22);
            } else {
              window.shrinkStart = null;
            }
             
            }