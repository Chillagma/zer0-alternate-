  class OBJAnimator {
  constructor(frameCount, filePattern, animSpeed = 1, scaleFactor = 1, cameraZ = -200) {
    this.frameCount = frameCount;
    this.filePattern = filePattern; // Example: name => i === 0 ? "enemy.obj" : `enemy${i+1}.obj`
    this.animSpeed = animSpeed;
    this.scaleFactor = scaleFactor;
    this.camera = { x: 0, y: 0, z: cameraZ, angle: 0 };

    this.frames = [];
    this.loadedFrames = 0;
    this.currentFrame = 0;
    this.lastAnimTime = 0;
    this.angle = 0;

    this.loadAllFrames();
  }

  loadOBJ(url) {
    return fetch(url)
      .then(res => res.text())
      .then(text => {
        const lines = text.split('\n');
        const vertices = [];
        const faces = [];
        for (let line of lines) {
          line = line.trim();
          if (line.startsWith('v ')) {
            const [, x, y, z] = line.split(/\s+/);
            vertices.push([parseFloat(x), parseFloat(y), parseFloat(z)]);
          } else if (line.startsWith('f ')) {
            const [, ...faceVerts] = line.split(/\s+/);
            faces.push(faceVerts.map(v => parseInt(v.split('/')[0], 10) - 1));
          }
        }
        return { vertices, faces };
      });
  }

  loadAllFrames() {
    for (let i = 0; i < this.frameCount; i++) {
      const name = this.filePattern(i);
      this.loadOBJ(name).then(obj => {
        this.frames[i] = obj;
        this.loadedFrames++;
      });
    }
  }

  rotateY([x, y, z], angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [
      x * cos - z * sin,
      y,
      x * sin + z * cos
    ];
  }

  project([x, y, z]) {
    const camera = this.camera;
    const scale = 500 / (z - camera.z + 5);
    const px = canvas.width / 2 + (x - camera.x) * scale;
    const py = canvas.height / 2 - (y - camera.y) * scale;
    return [px, py];
  }

  draw(ctx) {
    if (this.loadedFrames !== this.frameCount) return;

    const now = performance.now();
    if (now - this.lastAnimTime > 1000 / this.animSpeed) {
      this.currentFrame = (this.currentFrame + 1) % this.frameCount;
      this.lastAnimTime = now;
    }

    this.angle += 0.01;

    const obj = this.frames[this.currentFrame];
    ctx.save();
    ctx.strokeStyle = "lime";
    for (const face of obj.faces) {
      ctx.beginPath();
      for (let i = 0; i < face.length; i++) {
        let v = obj.vertices[face[i]];
        v = [v[0] * this.scaleFactor, v[1] * this.scaleFactor, v[2] * this.scaleFactor];
        v = this.rotateY(v, this.angle);
        const [x, y] = this.project(v);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }
    ctx.restore();
      
      handleProjectilesAndDraw()
   }
   }