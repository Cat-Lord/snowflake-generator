class Config {
  // TODO: default animate to false
  constructor(tentacles = 5, updateInterval = 15, animate = true) {
    this.tentacles = tentacles;
    this.updateInterval = updateInterval;
    this.animate = animate;
  }

  getTentacles() {
    return this.tentacles;
  }

  getUpdateInterval() {
    return this.updateInterval;
  }

  shouldAnimate() {
    return this.animate;
  }
}
