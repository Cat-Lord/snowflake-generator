class Generator {
  constructor(config, drawer) {
    this.isRunning = true;
    this.tentacleAngleRestriction = (2 * Math.PI) / config.getTentacles();
    this.config = config;
    this.drawer = drawer;

    this.startingX = drawer.getCanvasWidth() / 2;
    this.tentacle = [];
    this.generationId = null;
  }

  generate() {
    this.currentParticle = this.createParticle();
    this.generationId = setInterval(
      () => this.update(), // TODO: verify if this works
      this.config.getUpdateInterval()
    );
  }

  triggerGeneration(shouldStop = false) {
    if (shouldStop) {
      if (this.isRunning) {
        this.currentParticle = null;
        this.tentacle = [];
      } else {
        // 'shouldStop' action should start the generation
        return;
      }
    }

    this.isRunning = !this.isRunning;
    console.log('should stop?', this.isRunning);

    if (this.isRunning === false) {
      clearInterval(this.generationId);
      this.generationId = null;
    }
  }

  createParticle() {
    const x = this.startingX;
    const y = this.getRandom(this.drawer.getCanvasHeight() / 5);
    console.log('new particle at ', x, y);
    return new Particle(x, y);
  }

  dist(particleA, particleB) {
    return Math.sqrt(
      Math.pow(particleA.getX() - particleB.getX(), 2) +
        Math.pow(particleA.getY() - particleB.getY(), 2)
    );
  }

  doParticlesCollide(particleA, particleB) {
    const distance = this.dist(particleA, particleB);
    return distance < particleA.getRadius() + particleB.getRadius();
  }

  canUpdateCurrentParticle() {
    // TODO: check how this looks, maybe we need to stop only if the particle is already at/below 0
    if (this.currentParticle.getX() <= this.currentParticle.getRadius()) {
      return false;
    }

    for (const particle of this.tentacle) {
      if (this.doParticlesCollide(this.currentParticle, particle)) {
        return false;
      }
    }
    return true;
  }

  update() {
    console.log('update');
    if (this.canUpdateCurrentParticle()) {
      this.currentParticle.update();
      this.currentParticle.restrictWithinAngle(this.tentacleAngleRestriction);
    } else {
      this.tentacle.push(this.currentParticle);
      this.currentParticle = this.createParticle();
    }

    if (this.config.shouldAnimate()) {
      this.drawer.clearCanvas();
      this.drawer.drawRestrictedArea(
        (2 * Math.PI) / this.config.getTentacles()
      );

      this.drawer.drawParticle(this.currentParticle);
      this.tentacle.forEach((particle) => this.drawer.drawParticle(particle));
    }
  }

  getRandom(max) {
    return Math.random() * max;
  }
}
