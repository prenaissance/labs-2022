import Boundaries from "../Collision/Boundaries";
import BallAttributes from "./BallAttributes";
import "../../utils/extensions";
import { Physics } from "../utils/consts";
import { vec2 } from "gl-vectors/swizzling";
class Ball {
  position: vec2;
  velocity: vec2;
  acceleration: vec2;
  attributes: BallAttributes;

  constructor(
    position: vec2,
    velocity: vec2,
    acceleration: vec2,
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

    // draw a wavy ballon string
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    ctx.moveTo(this.position.x, this.position.y + radius);
    ctx.bezierCurveTo(
      this.position.x - radius,
      this.position.y + radius,
      this.position.x - radius,
      this.position.y + radius * 2,
      this.position.x,
      this.position.y + radius * 2
    );

    ctx.bezierCurveTo(
      this.position.x + radius,
      this.position.y + radius * 2,
      this.position.x + radius * 2,
      this.position.y + radius * 2,
      this.position.x,
      this.position.y + radius * 3
    );

    ctx.stroke();
  }

  drawVelocity() {
    const { canvas } = this.attributes;
    const ctx = canvas.getContext("2d")!;
    ctx.strokeStyle = "#000";
    ctx.beginPath();

    const normalizedVelocity = this.velocity.normalize();
    const velocityVector = vec2(
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
    const loseEnergy = () => {
      this.velocity = this.velocity.multiply(0.35);
    };
    const { canvas } = this.attributes;
    const { width, height } = canvas;
    const { top, right, bottom, left } = this.boundaries;
    if (bottom > height) {
      this.velocity.y = -Math.abs(this.velocity.y);
      this.acceleration.y = -Math.abs(this.acceleration.y);
      this.position.y = height - this.attributes.radius;
      loseEnergy();
    }
    if (top < 0) {
      this.velocity.y = Math.abs(this.velocity.y);
      this.acceleration.y = Math.abs(this.acceleration.y);
      this.position.y = 0 + this.attributes.radius;
      loseEnergy();
    }
    if (left < 0) {
      this.position.x = 400 - this.attributes.radius;
    }
    if (right > width) {
      this.position.x = 0 + this.attributes.radius;
    }
  }

  isInside(point: vec2) {
    return this.position.subtract(point).length <= this.attributes.radius;
  }

  update(delta: number) {
    const resultAcceleration = this.acceleration.add(vec2(0, Physics.minusG));

    this.velocity = this.velocity
      .add(resultAcceleration.multiply(delta))
      .multiply(1 - Physics.AIR_RESISTANCE * delta);

    this.position = this.position.add(this.velocity.multiply(delta));
  }

  rotateAcceleration(radians: number) {
    this.acceleration = this.acceleration.applyMatrix(
      new DOMMatrix().rotate(0, 0, radians * 180)
    );
  }
}

export default Ball;
