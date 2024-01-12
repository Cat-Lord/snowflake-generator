class Particle {
  constructor(x, y, radius = 5, color = 'white') {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  update = () => {
    this.x -= 1;
    this.y += -2 + Math.random() * 4;
  };

  // expects radians
  restrictWithinAngle(angle) {
    let y = Math.max(0, this.y);
    // basic trigonometry using known angle in perpendicular triangle
    y = Math.min(y, this.x * Math.tan(angle));
    this.y = y;
  }

  getColor = () => {
    return this.color;
  };

  getRadius = () => {
    return this.radius;
  };

  getX = () => {
    return this.x;
  };

  getY = () => {
    return this.y;
  };
}
