import Ball from "./Ball/Ball";
import BallAttributes from "./Ball/BallAttributes";
import { Physics } from "./utils/consts";
import { gaussian } from "./utils/noises";

export class Fly extends Ball {
  constructor(
    position: DOMPoint,
    velocity: DOMPoint,
    acceleration: DOMPoint,
    attributes: BallAttributes
  ) {
    super(position, velocity, acceleration, attributes);
  }

  override draw() {
    const { canvas, color, radius } = this.attributes;
    const ctx = canvas.getContext("2d")!;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  }

  drawAcceleration() {
    const { canvas } = this.attributes;
    const ctx = canvas.getContext("2d")!;
    ctx.strokeStyle = "#0b0";
    ctx.beginPath();

    const normalizedAcceleration = this.acceleration.normalize();
    const accelerationVector = new DOMPoint(
      normalizedAcceleration.x * this.attributes.radius,
      normalizedAcceleration.y * this.attributes.radius
    );
    ctx.moveTo(
      this.position.x + accelerationVector.x,
      this.position.y + accelerationVector.y
    );
    const accelerationVectorEnd = this.position.add(
      accelerationVector.multiply(2)
    );
    ctx.lineTo(accelerationVectorEnd.x, accelerationVectorEnd.y);

    ctx.stroke();
  }

  override update(delta: number) {
    // update acceleration in random direction
    this.acceleration = this.acceleration.matrixTransform(
      new DOMMatrix().rotateSelf((gaussian(Math.random()) - 0.5) * Math.PI)
    );
    this.velocity
      .addSelf(this.acceleration.multiply(delta))
      .multiplySelf(1 - Physics.AIR_RESISTANCE * delta);
    this.position.addSelf(this.velocity.multiply(delta));
  }

  override checkBoundaryCollision() {
    const { canvas } = this.attributes;
    const { width, height } = canvas;
    const { top, right, bottom, left } = this.boundaries;
    // make fly teleport to the other side of the screen
    if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.x > width) {
      this.position.x = 0;
    }
    if (this.position.y < 0) {
      this.position.y = height;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    }
  }
}
