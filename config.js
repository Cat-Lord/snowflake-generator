class Config {
  constructor(tentacles = 7, spread = 3) {
    this.tentacles = tentacles;
    this.spread = spread;
    this.tentacleRestrictionAngle = Math.PI / this.tentacles;
  }

  setTentacles(tentacles) {
    this.tentacles = tentacles;
  }
  getTentacles() {
    return this.tentacles;
  }

  setSpread(spread) {
    this.spread = spread;
  }
  getSpread() {
    return this.spread;
  }

  getTentacleRestrictionAngle() {
    return this.tentacleRestrictionAngle;
  }
}
