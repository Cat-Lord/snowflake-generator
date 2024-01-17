class Generator {
  constructor(config, drawer) {
    this.isRunning = false;
    this.config = config;
    this.drawer = drawer;

    this.startingX = drawer.getCanvasWidth() / 2;
    this.tentacle = [];
    this.generationId = null;
    this.finished = false;
  }

  generate() {
    this.currentParticle = this.createParticle();
    this.generationId = requestAnimationFrame(() => this.update());
  }

  triggerGeneration() {
    if (this.finished) {
      this.resetGeneration();
    }

    if (this.generationId === null) {
      this.generationId = requestAnimationFrame(() => this.generate());
    } else {
      cancelAnimationFrame(this.generationId);
      this.generationId = null;
    }
  }

  resetGeneration() {
    if (this.generationId !== null) {
      this.triggerGeneration();
    }

    this.tentacle = [];
    this.currentParticle = null;
    this.drawer.clearCanvas();
    this.finished = false;
  }

  createParticle() {
    const x = this.startingX;
    const y = this.getRandom(15);
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
    // keep generating new particles
    while (this.canUpdateCurrentParticle()) {
      this.currentParticle.update(this.config.spread);
      this.currentParticle.restrictWithinAngle(
        this.config.getTentacleRestrictionAngle()
      );
    }

    this.tentacle.push(this.currentParticle);
    this.drawer.render(this.tentacle);
    this.currentParticle = this.createParticle();

    // new particle cannot be updated, generation is finished
    if (this.canUpdateCurrentParticle() === false) {
      this.triggerGeneration();
      this.finished = true;
    } else {
      this.generationId = requestAnimationFrame(() => this.update());
    }
  }

  getRandom(max) {
    return Math.random() * max;
  }
}
