class Drawer {
  constructor(canvas, defaultFill = 'white') {
    if (canvas === undefined) {
      throw new Error('Canvas undefined');
    }
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.defaultFill = defaultFill;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
  }

  clearCanvas() {
    this.ctx.clearRect(
      -this.canvas.width / 2,
      -this.canvas.height / 2,
      this.canvas.width,
      this.canvas.height
    );
  }

  drawParticle(particle) {
    this.ctx.fillStyle = particle.getColor();
    this.ctx.beginPath();
    this.ctx.arc(
      particle.getX(),
      particle.getY(),
      particle.getRadius(),
      0,
      2 * Math.PI
    );
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.fillStyle = this.defaultFill;
  }

  getCanvasWidth() {
    return this.canvas.width;
  }

  getCanvasHeight() {
    return this.canvas.height;
  }

  drawRestrictedArea() {
    this.ctx.fillStyle = 'red';

    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, this.canvas.width);
    // todo
    this.ctx.closePath();
  }
}
