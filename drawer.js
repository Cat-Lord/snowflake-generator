class Drawer {
  constructor(canvas, config, defaultFill = 'white') {
    if (canvas === undefined) {
      throw new Error('Canvas undefined');
    }
    this.canvas = canvas;
    this.config = config;
    this.ctx = canvas.getContext('2d');
    this.defaultFill = defaultFill;

    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.scale(0.9, -0.9);
    this.ctx.rotate(Math.PI / 2);
  }

  clearCanvas() {
    this.ctx.clearRect(
      -this.canvas.width / 2,
      -this.canvas.height / 2,
      this.canvas.width,
      this.canvas.height
    );
  }

  drawAllParticles(allParticles) {
    for (const particle of allParticles) {
      this.drawParticle(particle);
    }
  }

  render(allParticles) {
    this.clearCanvas();
    // this.showRestrictionGrid();
    this.drawParticle(new Particle(0, 0, 5, 'red'));

    for (let i = 0; i < this.config.getTentacles(); i++) {
      this.ctx.save();
      this.ctx.rotate(i * ((2 * Math.PI) / this.config.getTentacles()));
      this.drawAllParticles(allParticles);
      this.ctx.scale(1, -1);
      this.drawAllParticles(allParticles);
      this.ctx.restore();
    }
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

  showRestrictionGrid() {
    this.ctx.strokeStyle = 'red';
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(this.canvas.width, 0);
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(
      this.canvas.width,
      this.canvas.width * Math.tan(this.config.getTentacleRestrictionAngle())
    );
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.strokeStyle = 'white';
  }
}
