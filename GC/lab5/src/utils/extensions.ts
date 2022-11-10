declare global {
  interface DOMPoint {
    get length(): number;
    add(point: DOMPoint): DOMPoint;
    subtract(point: DOMPoint): DOMPoint;
    multiply(coefficient: number): DOMPoint;
    normalize(): DOMPoint;

    addSelf(point: DOMPoint): DOMPoint;
    subtractSelf(point: DOMPoint): DOMPoint;
    multiplySelf(coefficient: number): DOMPoint;
    normalizeSelf(): DOMPoint;

    dot(point: DOMPoint): number;
  }
}

Object.defineProperty(DOMPoint.prototype, "length", {
  get: function () {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  },
});

DOMPoint.prototype.multiplySelf = function (coefficient: number): DOMPoint {
  this.x *= coefficient;
  this.y *= coefficient;
  return this;
};

DOMPoint.prototype.addSelf = function (point: DOMPoint): DOMPoint {
  this.x += point.x;
  this.y += point.y;
  return this;
};

DOMPoint.prototype.subtractSelf = function (point: DOMPoint): DOMPoint {
  this.x -= point.x;
  this.y -= point.y;
  return this;
};

DOMPoint.prototype.normalize = function (): DOMPoint {
  return this.multiply(1 / this.length);
};

DOMPoint.prototype.multiply = function (coefficient: number): DOMPoint {
  return new DOMPoint(this.x * coefficient, this.y * coefficient);
};

DOMPoint.prototype.add = function (point: DOMPoint): DOMPoint {
  return new DOMPoint(this.x + point.x, this.y + point.y);
};

DOMPoint.prototype.subtract = function (point: DOMPoint): DOMPoint {
  return new DOMPoint(this.x - point.x, this.y - point.y);
};

DOMPoint.prototype.normalizeSelf = function (): DOMPoint {
  return this.multiplySelf(1 / this.length);
};

DOMPoint.prototype.dot = function (point: DOMPoint) {
  return this.x * point.x + (this.y + point.y) + (this.z + point.z);
};

export default {};
