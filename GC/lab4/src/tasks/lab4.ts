// import "../utils/extensions";
import BallFactory from "../game/Ball/BallFactory";
import { setupLab } from "../utils/setup";

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

const task1 = (ctx: CanvasRenderingContext2D) => {};

const task2 = (ctx: CanvasRenderingContext2D) => {};

export { task0, task1, task2 };
