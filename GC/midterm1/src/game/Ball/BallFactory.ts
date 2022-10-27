import Ball from "./Ball";
import BallAttributes from "./BallAttributes";

abstract class BallFactory {
  private static _ballAttributes = new Map<string, BallAttributes>();
  static createBall(
    position: DOMPoint,
    velocity: DOMPoint,
    acceleration: DOMPoint,
    radius: number,
    color: string,
    canvas: HTMLCanvasElement
  ): Ball {
    const hash = `${radius}-${color}`;
    if (!this._ballAttributes.has(hash)) {
      this._ballAttributes.set(hash, { radius, color, canvas });
    }
    return new Ball(
      position,
      velocity,
      acceleration,
      this._ballAttributes.get(hash)!
    );
  }
}

export default BallFactory;
