class Config {
  // TODO: default animate to false
  constructor(tentacles = 5, animate = true) {
    this.tentacles = tentacles;
    this.animate = animate;
  }

  getTentacles() {
    return this.tentacles;
  }

  shouldAnimate() {
    return this.animate;
  }
}
