// import "../utils/extensions";
import { setupLab } from "../utils/setup";
import { Simplex2 } from "tumult";
import Ball from "../game/Ball/Ball";
import { vec2 } from "gl-vectors/swizzling";
import Bacteria from "../game/Bacteria/Bacteria";
import KillerBacteria from "../game/KillerBacteria/KillerBacteria";

const TICK_RATE = 1000 / 60;

const colors = [
  "#abd123",
  "#d82",
  "#aba123",
  "#aad9f2",
  "#a23",
  "#aa2",
  "#ad7",
  "#8bd",
  "#89e",
];


const midterm = (ctx: CanvasRenderingContext2D) => {
  setupLab(ctx);
  const { canvas } = ctx;

  const bacterias = new Array(8).fill(0).map((_, index) => {
    return new Bacteria(
      vec2(50 + index * 30, 100 + index * 30),
      vec2(25, index * 2),
      vec2(0, 0),
      { radius: 20 - index, color: colors[index], canvas }
    );
  });

  const killerBacterias = [
    new KillerBacteria(
      vec2(200, 200),
      vec2(80, -30),
      vec2(0, 0),
      { color: "#666", radius: 10, canvas },
    ),
    new KillerBacteria(
      vec2(100, 300),
      vec2(-25, -12),
      vec2(0, 0),
      { color: "#999", radius: 15, canvas }
    ),
    new KillerBacteria(
      vec2(300, 300),
      vec2(25, -12),
      vec2(0, 0),
      { color: "#32a", radius: 20, canvas }
    )
  ];

  const allBacterias = [...bacterias, ...killerBacterias];

  let interval = setInterval(() => {
    allBacterias.forEach((bacteria) => {
      const isSpecialArea = bacteria.position.x > 200;
      if (isSpecialArea) {
        bacteria.update((TICK_RATE * 5) / 1000);
      }
      else {
        Ball.prototype.update.call(bacteria, (TICK_RATE*5)/ 1000)
      }
      bacteria.checkBoundaryCollision();
      allBacterias.forEach((otherBacteria) => {
        if (bacteria !== otherBacteria) {
          bacteria.checkOtherCollision(otherBacteria);
        }
      });
    });
  }, TICK_RATE);

  let animationFrame: number;

  const loop = () => {
    setupLab(ctx);
    allBacterias.forEach((bacteria) => bacteria.draw());
    animationFrame = requestAnimationFrame(loop);
  };

  animationFrame = requestAnimationFrame(loop);

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
