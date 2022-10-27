import { setupLab } from "../utils/setup";
import { Fly } from "../game/Fly";

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
  // background
  setupLab(ctx);

  flies.forEach((fly) => fly.draw());
  // update physics state every 1/60th of a second
  let interval = setInterval(() => {
    flies.forEach((fly) => {
      fly.update((TICK_RATE * 6) / 1000);
      fly.checkBoundaryCollision();
    });
  }, TICK_RATE);

  // display the changes at an independent speed of the physics
  const loop = () => {
    setupLab(ctx);
    flies.forEach((fly) => fly.draw());
    requestAnimationFrame(loop);
  };

  // start the animation at the framerate that is optimal chosen by the browser
  const animationFrame = requestAnimationFrame(loop);

  // stop the animation when the user clicks the stop button
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
