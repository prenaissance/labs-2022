// import "../utils/extensions";
import BallFactory from "../game/Ball/BallFactory";
import { setupLab } from "../utils/setup";
import noisify from "noise-canvas";
import { Perlin1 } from "tumult";
import { Fly } from "../game/Fly";
import { gaussian } from "../game/utils/noises";

const TICK_RATE = 1000 / 60;

const midterm = (ctx: CanvasRenderingContext2D) => {
  const colors = [
    "#f00",
    "#0f0",
    "#00f",
    "#ff0",
    "#0ff",
    "#f0f",
    "#999",
    "#acd",
    "#be1",
  ];

  const flies: Fly[] = [];
  // fill array with 3x3 grid of Fly object
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const fly = new Fly(
        new DOMPoint(100 + i * 100, 100 + j * 100),
        new DOMPoint(0, 0),
        new DOMPoint(0, 10),
        {
          canvas: ctx.canvas,
          color: colors[j * 3 + i],
          radius: 20,
        }
      );
      flies.push(fly);
    }
  }

  const fly = flies[8];

  setupLab(ctx);

  flies.forEach((fly) => fly.draw());

  let interval = setInterval(() => {
    flies.forEach((fly) => {
      fly.update((TICK_RATE * 6) / 1000);
      fly.checkBoundaryCollision();
    });
  }, TICK_RATE);

  const loop = () => {
    setupLab(ctx);
    flies.forEach((fly) => fly.draw());
    requestAnimationFrame(loop);
  };

  const animationFrame = requestAnimationFrame(loop);

  const clearButton = document.querySelector("#clear") as HTMLButtonElement;
  clearButton.addEventListener(
    "click",
    () => {
      clearInterval(interval);
      cancelAnimationFrame(animationFrame);
      setupLab(ctx);
    },
    { once: true }
  );
};

export { midterm };
