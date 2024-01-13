class Generator {
  constructor(config, drawer) {
    this.isRunning = false;
    this.config = config;
    this.drawer = drawer;

    this.startingX = drawer.getCanvasWidth() / 2;
    this.tentacle = [];
    this.generationId = null;
  }

  generate() {
    this.currentParticle = this.createParticle();
    this.generationId = requestAnimationFrame(() => this.update());
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

    // todo: this needs to be either removed or fixed. Currently only pausing is possible
    this.isRunning = !this.isRunning;
    if (this.isRunning === false) {
      cancelAnimationFrame(this.generationId);
      this.generationId = null;
    } else if (this.generationId === null) {
      this.generate();
    }
  }

  createParticle() {
    const x = this.startingX;
    const y = this.getRandom(this.drawer.getCanvasHeight() / 5);
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
      this.currentParticle.update();
      this.currentParticle.restrictWithinAngle(
        this.config.getTentacleRestrictionAngle()
      );
    }

    this.tentacle.push(this.currentParticle);
    this.drawer.render(this.tentacle);
    this.currentParticle = this.createParticle();

    // new particle cannot be updated, generation is finished
    if (this.canUpdateCurrentParticle() === false) {
      this.triggerGeneration(true);
      console.log('Generation ended');
    } else {
      this.generationId = requestAnimationFrame(() => this.update());
    }
  }

  getRandom(max) {
    return Math.random() * max;
  }
}
