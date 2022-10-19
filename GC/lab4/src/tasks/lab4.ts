// import "../utils/extensions";
import BallFactory from "../game/Ball/BallFactory";
import { setupLab } from "../utils/setup";
import noisify from "noise-canvas";
import { Simplex2, Perlin2 } from "tumult";
import { Fly } from "../game/Fly";

const TICK_RATE = 1000 / 60;

const task0 = (ctx: CanvasRenderingContext2D) => {
  setupLab(ctx);

  const { canvas } = ctx;
  const ball = BallFactory.createBall(
    new DOMPoint(100, 100),
    new DOMPoint(50, 12),
    new DOMPoint(0, 0),
    20,
    "#f00",
    canvas
  );

  ball.draw();

  let interval = setInterval(() => {
    ball.update((TICK_RATE * 5) / 1000);
    ball.checkBoundaryCollision();
  }, TICK_RATE);

  const loop = () => {
    setupLab(ctx);
    ball.draw();
    ball.drawVelocity();
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

  // drag n drop
  let isDragging = false;
  let dragStart: DOMPoint;
  let dragOffset: DOMPoint;
  let dragStartTime = performance.now();

  // performance problems with not removing event listeners
  canvas.addEventListener("mousedown", (e) => {
    const { x, y } = e;
    const { left, top } = canvas.getBoundingClientRect();
    const mousePosition = new DOMPoint(x - left, y - top);
    if (ball.isInside(mousePosition)) {
      isDragging = true;
      dragStart = ball.position;
      dragOffset = ball.position.subtract(mousePosition);
      dragStartTime = performance.now();
      ball.velocity = new DOMPoint(0, 0);
      ball.acceleration = new DOMPoint(0, 0);
    }
  });

  canvas.addEventListener("mousemove", (e) => {
    if (isDragging) {
      const { x, y } = e;
      const { left, top } = canvas.getBoundingClientRect();
      const mousePosition = new DOMPoint(x - left, y - top);
      ball.position = dragOffset.add(mousePosition);
    }
  });

  canvas.addEventListener("mouseup", (e) => {
    if (isDragging) {
      const { x, y } = e;
      const { left, top } = canvas.getBoundingClientRect();
      const mousePosition = new DOMPoint(x - left, y - top);
      const distance = mousePosition.subtract(dragStart);
      const dragEndTime = performance.now();
      const dragDuration = (dragEndTime - dragStartTime) / 1000;
      ball.velocity = distance.multiply(1 / dragDuration);
      isDragging = false;
    }
  });

  canvas.addEventListener("mouseleave", (e) => {
    if (isDragging) {
      const { x, y } = e;
      const { left, top } = canvas.getBoundingClientRect();
      const mousePosition = new DOMPoint(x - left, y - top);
      const distance = mousePosition.subtract(dragStart);
      const dragEndTime = performance.now();
      const dragDuration = (dragEndTime - dragStartTime) / 1000;
      ball.velocity = distance.multiply(1 / dragDuration);
      isDragging = false;
    }
  });
};

const task1 = (ctx: CanvasRenderingContext2D) => {
  setupLab(ctx);

  const clearButton = document.querySelector("#clear") as HTMLButtonElement;

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "controls";
  const whiteNoiseButton = document.createElement("button");
  whiteNoiseButton.innerText = "White Noise";
  const simplexNoiseButton = document.createElement("button");
  simplexNoiseButton.innerText = "Simplex Noise";
  const perlinNoiseButton = document.createElement("button");
  perlinNoiseButton.innerText = "Perlin Noise";
  const gaussianNoiseButton = document.createElement("button");
  gaussianNoiseButton.innerText = "Gaussian Noise";

  const buttons = [
    whiteNoiseButton,
    simplexNoiseButton,
    perlinNoiseButton,
    gaussianNoiseButton,
  ];
  buttons.forEach((button) => (button.style.fontSize = "0.75em"));

  whiteNoiseButton.addEventListener("click", () => {
    const { canvas } = ctx;
    noisify(canvas, (x, y) => {
      return Math.round(Math.random());
    });
  });

  simplexNoiseButton.addEventListener("click", () => {
    const { canvas } = ctx;
    const simplex = new Simplex2();
    noisify(canvas, (x, y) => {
      return simplex.gen(x / 10, y / 10);
    });
  });

  perlinNoiseButton.addEventListener("click", () => {
    const { canvas } = ctx;
    const perlin = new Perlin2();
    noisify(canvas, (x, y) => {
      return perlin.gen(x / 10, y / 10);
    });
  });

  gaussianNoiseButton.addEventListener("click", () => {
    const { canvas } = ctx;
    const median = 0.5;
    const stdDev = 0.1;
    const gaussian = (x: number) => {
      return (
        (1 / (stdDev * Math.sqrt(2 * Math.PI))) *
        Math.exp(-Math.pow(x - median, 2) / (2 * Math.pow(stdDev, 2)))
      );
    };

    const gaussianNoise = () => gaussian(Math.random());

    noisify(canvas, [gaussianNoise, gaussianNoise, gaussianNoise]);
  });

  buttonContainer.append(...buttons);
  const flexContainer = document.querySelector(
    ".flex-container"
  ) as HTMLDivElement;
  flexContainer.appendChild(buttonContainer);

  clearButton.addEventListener("click", () => buttonContainer.remove(), {
    once: true,
  });
};

const task2 = (ctx: CanvasRenderingContext2D) => {
  const fly = new Fly(
    new DOMPoint(100, 100),
    new DOMPoint(0, 0),
    new DOMPoint(5, 0),
    {
      color: "#8e44ad",
      radius: 10,
      canvas: ctx.canvas,
    }
  );

  setupLab(ctx);

  fly.draw();

  let interval = setInterval(() => {
    fly.update((TICK_RATE * 3) / 1000);
    fly.checkBoundaryCollision();
  }, TICK_RATE);

  const loop = () => {
    setupLab(ctx);
    fly.draw();
    fly.drawAcceleration();
    fly.drawVelocity();
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

export { task0, task1, task2 };
