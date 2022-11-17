import { vec2 } from "gl-vectors/swizzling";
import Ball from "../Ball/Ball";
import BallAttributes from "../Ball/BallAttributes";
import { Physics } from "../utils/consts";

class Bacteria extends Ball {
  private _timePassed = 0;
  constructor(
    position: vec2,
    velocity: vec2,
    acceleration: vec2,
    attributes: BallAttributes
  ) {
    super(position, velocity, acceleration, attributes);
  }
  private getOscillation() {
    return this.velocity
      .applyMatrix(new DOMMatrix().rotate(90))
      .multiply(Math.sin(this._timePassed) * 1);
  }

  override draw() {
    const { canvas, color, radius } = this.attributes;
    const { x, y } = this.position;
    const ctx = canvas.getContext("2d")!;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();

    // draw 6 legs
    ctx.strokeStyle = "#000";
    const legPath = new Path2D();
    legPath.moveTo(0, 0);
    legPath.lineTo(-radius / 2, 0);
    legPath.ellipse(-radius / 2, 0, 2, 2, 0, 0, 2 * Math.PI);

    for (let i = 0; i < 6; i++) {
      const matrix = new DOMMatrix()
        .translate(x, y)
        .rotate(i * 60)
        .translate(-radius, 0);

      const rotatedLegPath = new Path2D();
      rotatedLegPath.addPath(legPath, matrix);

      ctx.stroke(rotatedLegPath);
    }
  }

  override update(delta: number) {
    this._timePassed += delta;
    this.acceleration = this.getOscillation();
    this.velocity = this.velocity
      .add(this.acceleration.multiply(delta))
      .multiply(0.9985);

    this.position = this.position.add(this.velocity.multiply(delta));
  }

  override checkBoundaryCollision() {
    const { canvas } = this.attributes;
    const { width, height } = canvas;
    const { top, right, bottom, left } = this.boundaries;

    if (bottom > height) {
      this.velocity.y = -Math.abs(this.velocity.y);
      this.acceleration.y = -Math.abs(this.acceleration.y);
      this.position.y = height - this.attributes.radius;
    }
    if (top < 0) {
      this.velocity.y = Math.abs(this.velocity.y);
      this.acceleration.y = Math.abs(this.acceleration.y);
      this.position.y = 0 + this.attributes.radius;
    }
    if (left < 0) {
      this.velocity.x = Math.abs(this.velocity.x);
      this.acceleration.x = Math.abs(this.acceleration.x);
      this.position.x = 0 + this.attributes.radius;
    }
    if (right > width) {
      this.velocity.x = -Math.abs(this.velocity.x);
      this.acceleration.x = -Math.abs(this.acceleration.x);
      this.position.x = width - this.attributes.radius;
    }
  }

  checkOtherCollision(other: Bacteria) {
    const { radius } = this.attributes;
    const { radius: radius2 } = other.attributes;

    const distance = other.position.subtract(this.position).length;
    if (distance > radius + radius2) {
      return;
    }

    // calculate new velocities
    const u1 = this.velocity;
    const u2 = other.velocity;
    const m1 = Math.PI * radius ** 2;
    const m2 = Math.PI * radius2 ** 2;
    const v1 = u1
      .multiply(m1 - m2)
      .add(u2.multiply(2 * m2))
      .divide(m1 + m2);
    const v2 = u2
      .multiply(m2 - m1)
      .add(u1.multiply(2 * m1))
      .divide(m1 + m2);

    this.velocity = v1;
    other.velocity = v2;

    // offset the balls so they don't overlap
    const offset = this.position
      .subtract(other.position)
      .normalize()
      .multiply(radius + radius2 - distance);
    this.position = this.position.add(offset);
    other.position = other.position.subtract(offset);
  }
}

export default Bacteria;
