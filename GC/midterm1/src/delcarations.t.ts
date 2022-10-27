declare module "noise-canvas" {
  function content(
    canvas: HTMLCanvasElement,
    fn: (x: number, y: number) => any
  ): void;
  function content(
    canvas: HTMLCanvasElement,
    fns: Array<(x: number, y: number) => any>
  ): void;

  export default content;
}

declare module "tumult" {
  class Simplex2 {
    constructor(seed?: number);
    gen(x: number, y: number): number;
    seed(seed: number): void;
    transform(fn: (x: number, y: number) => any): void;
    octavate(...args: any): number;
  }

  class Perlin2 {
    constructor(seed?: number);
    gen(x: number, y: number): number;
    seed(seed: number): void;
    transform(fn: (x: number, y: number) => any): void;
    octavate(...args: any): number;
  }

  class Perlin1 {
    constructor(seed?: number);
    gen(x: number): number;
    seed(seed: number): void;
    transform(fn: (x: number, y: number) => any): void;
    octavate(...args: any): number;
  }
  export { Simplex2, Perlin2, Perlin1 };
}
