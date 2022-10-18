import Boundaries from "../Collision/Boundaries";
import BallAttributes from "./BallAttributes";
import "../../utils/extensions";
import { Physics } from "../utils/consts";

class Ball {
  position: DOMPoint;
  velocity: DOMPoint;
  acceleration: DOMPoint;
  attributes: BallAttributes;

  constructor(
    position: DOMPoint,
    velocity: DOMPoint,
    acceleration: DOMPoint,
    attributes: BallAttributes
  ) {
    this.position = position;
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.attributes = attributes;
  }

  get boundaries(): Boundaries {
    const { radius } = this.attributes;
    const { x, y } = this.position;
    return {
      top: y - radius,
      right: x + radius,
      bottom: y + radius,
      left: x - radius,
    };
  }

  draw() {
    const { canvas, color, radius } = this.attributes;
    const ctx = canvas.getContext("2d")!;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  }

  drawVelocity() {
    const { canvas } = this.attributes;
    const ctx = canvas.getContext("2d")!;
    ctx.strokeStyle = "#000";
    ctx.beginPath();

    const normalizedVelocity = this.velocity.normalize();
    const velocityVector = new DOMPoint(
      normalizedVelocity.x * this.attributes.radius,
      normalizedVelocity.y * this.attributes.radius
    );
    ctx.moveTo(
      this.position.x + velocityVector.x,
      this.position.y + velocityVector.y
    );
    const velocityVectorEnd = this.position.add(velocityVector.multiply(2));
    ctx.lineTo(velocityVectorEnd.x, velocityVectorEnd.y);

    ctx.stroke();
  }

  checkBoundaryCollision() {
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

  isInside(point: DOMPoint) {
    return this.position.subtract(point).length <= this.attributes.radius;
  }

  update(delta: number) {
    const resultAcceleration = this.acceleration.add(
      new DOMPoint(0, Physics.G)
    );

    this.velocity
      .addSelf(resultAcceleration.multiply(delta))
      .multiplySelf(1 - Physics.AIR_RESISTANCE * delta);

    this.position.addSelf(this.velocity.multiply(delta));
  }
}

export default Ball;
