import { vec2 } from "gl-vectors/swizzling";
import Ball from "../Ball/Ball";
import BallAttributes from "../Ball/BallAttributes";

class KillerBacteria extends Ball {
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

    // draw outside circle
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    ctx.arc(x, y, radius + 2, 0, 2 * Math.PI);
    ctx.stroke();

    // draw 3 bubbles inside

    const bubblePath = new Path2D();
    bubblePath.moveTo(0, 0);
    bubblePath.ellipse(0, 0, 2, 2, 0, 0, 2 * Math.PI);

    for(let i = 0; i < 3; i++) {
      const matrix = new DOMMatrix()
        .translate(x, y)
        .rotate(i * 120)
        .translate(-radius / 2, 0);

      const rotatedBubblePath = new Path2D();
      rotatedBubblePath.addPath(bubblePath, matrix);

      ctx.stroke(rotatedBubblePath);
    }
  }

  override update(delta: number) {
    this._timePassed += delta;
    this.velocity = this.velocity
      .add(this.acceleration.multiply(delta))

    this.position = this.position.add(this.velocity.multiply(delta*0.5));
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

  override checkOtherCollision(other: Ball) {
    const { radius } = this.attributes;
    const { radius: radius2 } = other.attributes;

    const distance = other.position.subtract(this.position).length;
    if (distance > radius + radius2) {
      return;
    }

    // redirect the other object in the opposite angle

    const distVector = this.position.subtract(other.position);
    const angle = Math.atan2(distVector.y, distVector.x);
    const newAngle = angle + Math.PI;
    const newVelocity = new vec2(
      Math.cos(newAngle) * other.velocity.length,
      Math.sin(newAngle) * other.velocity.length
    );

    other.velocity = newVelocity;

    // offset the balls so they don't overlap
    const offset = this.position
      .subtract(other.position)
      .normalize()
      .multiply(radius + radius2 - distance);
    this.position = this.position.add(offset);
    other.position = other.position.subtract(offset);
  }
}

export default KillerBacteria;
