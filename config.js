class Config {
  constructor(
    tentacles = 5,
    spread = 3,
    radius = 3,
    color = new Color(255, 255, 255)
  ) {
    this.tentacles = tentacles;
    this.spread = spread;
    this.tentacleRestrictionAngle = Math.PI / this.tentacles;
    this.radius = radius;
    this.color = new Color(color.getR(), color.getG(), color.getB());
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

  getRadius() {
    return this.radius;
  }

  setRadius(radius) {
    this.radius = radius;
  }

  getColor() {
    return this.color;
  }
  setColor(color) {
    this.color = new Color(color.getR(), color.getG(), color.getB());
  }
}
