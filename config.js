class Config {
  // TODO: default animate to false
  constructor(tentacles = 5, animate = true) {
    this.tentacles = tentacles;
    this.animate = animate;
    this.tentacleRestrictionAngle = Math.PI / this.tentacles;
  }

  getTentacles() {
    return this.tentacles;
  }

  getTentacleRestrictionAngle() {
    return this.tentacleRestrictionAngle;
  }

  shouldAnimate() {
    return this.animate;
  }
}
