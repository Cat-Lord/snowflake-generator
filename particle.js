class Particle {
  constructor(x, y, radius, color = 'white') {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  update = (spread) => {
    this.x -= 1;
    this.y += -spread + Math.random() * (spread * 2);
  };

  // expects radians
  restrictWithinAngle(angle) {
    let y = Math.max(0, this.y);
    // basic trigonometry using known angle in a perpendicular triangle
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
