// import "../utils/extensions";
import BallFactory from "../game/Ball/BallFactory";
import { setupLab } from "../utils/setup";
import { Simplex2, Perlin2 } from "tumult";
import Ball from "../game/Ball/Ball";

const TICK_RATE = 1000 / 60;

const colors = [
  "#abd123",
  "#d82",
  "#abd123",
  "#aad9f2",
  "#a23",
  "#aa2",
  "#ad7",
  "#8bd",
  "#89e",
];

const task1 = (ctx: CanvasRenderingContext2D) => {
  setupLab(ctx);

  let selectedBalloon: Ball | null = null;
  const wind = new Simplex2();
  const { canvas } = ctx;

  const balloons = new Array(8).fill(0).map((_, index) => {
    return BallFactory.createBall(
      new DOMPoint(50 + index * 20, 100 + index * 20),
      new DOMPoint(0, 1),
      new DOMPoint(20, 0),
      20,
      colors[index],
      canvas
    );
  });

  let interval = setInterval(() => {
    const windValue = wind.gen(Math.random(), 0) / 8;
    balloons.forEach((balloon) => {
      balloon.update((TICK_RATE * 5) / 1000);
      balloon.rotateAcceleration(windValue);
      balloon.checkBoundaryCollision();
    });
  }, TICK_RATE);

  const loop = () => {
    setupLab(ctx);
    balloons.forEach((balloon) => balloon.draw());

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
    balloons.forEach((balloon) => {
      if (balloon.isInside(mousePosition)) {
        isDragging = true;
        selectedBalloon = balloon;
        dragStart = balloon.position;
        dragOffset = balloon.position.subtract(mousePosition);
        dragStartTime = performance.now();
        balloon.velocity = new DOMPoint(0, 0);
      }
    });
  });

  canvas.addEventListener("mousemove", (e) => {
    if (isDragging) {
      const { x, y } = e;
      const { left, top } = canvas.getBoundingClientRect();
      const mousePosition = new DOMPoint(x - left, y - top);
      selectedBalloon!.position = dragOffset.add(mousePosition);
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
      selectedBalloon!.velocity = distance.multiply(1 / dragDuration);
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
      selectedBalloon!.velocity = distance.multiply(1 / dragDuration);
      isDragging = false;
    }
  });
};

export { task1 };
