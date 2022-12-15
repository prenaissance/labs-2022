// import "../utils/extensions";
import { setupLab } from "../utils/setup";
import { Simplex2, Perlin2 } from "tumult";
import Ball from "../game/Ball/Ball";
import { vec2 } from "gl-vectors/swizzling";
import Bacteria from "../game/Bacteria/Bacteria";

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

const task1 = (ctx: CanvasRenderingContext2D) => {
  setupLab(ctx);

  let selectedBalloon: Ball | null = null;
  const wind = new Simplex2();
  const { canvas } = ctx;

  const balloons = new Array(8).fill(0).map((_, index) => {
    return new Ball(
      vec2(50 + index * 20, 100 + index * 20),
      vec2(0, 1),
      vec2(20, 0),
      { radius: 20, color: colors[index], canvas }
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

  let animationFrame: number;

  const testVec = vec2(1, 2);
  console.log(testVec);
  const loop = () => {
    setupLab(ctx);
    balloons.forEach((balloon) => balloon.draw());
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

  // drag n drop
  let isDragging = false;
  let dragStart: vec2;
  let dragOffset: vec2;
  let dragStartTime = performance.now();

  // performance problems with not removing event listeners
  canvas.addEventListener("mousedown", (e) => {
    const { x, y } = e;
    const { left, top } = canvas.getBoundingClientRect();
    const mousePosition = new vec2(x - left, y - top);
    balloons.forEach((balloon) => {
      if (balloon.isInside(mousePosition)) {
        isDragging = true;
        selectedBalloon = balloon;
        dragStart = balloon.position;
        dragOffset = balloon.position.subtract(mousePosition);
        dragStartTime = performance.now();
        balloon.velocity = new vec2(0, 0);
      }
    });
  });

  canvas.addEventListener("mousemove", (e) => {
    if (isDragging) {
      const { x, y } = e;
      const { left, top } = canvas.getBoundingClientRect();
      const mousePosition = new vec2(x - left, y - top);
      selectedBalloon!.position = dragOffset.add(mousePosition);
    }
  });

  canvas.addEventListener("mouseup", (e) => {
    if (isDragging) {
      const { x, y } = e;
      const { left, top } = canvas.getBoundingClientRect();
      const mousePosition = new vec2(x - left, y - top);
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
      const mousePosition = new vec2(x - left, y - top);
      const distance = mousePosition.subtract(dragStart);
      const dragEndTime = performance.now();
      const dragDuration = (dragEndTime - dragStartTime) / 1000;
      selectedBalloon!.velocity = distance.multiply(1 / dragDuration);
      isDragging = false;
    }
  });
};

const task2 = (ctx: CanvasRenderingContext2D) => {
  setupLab(ctx);
  const { canvas } = ctx;

  const bacteria = new Bacteria(vec2(50, 50), vec2(40, -12), vec2(0, 0), {
    color: "red",
    radius: 20,
    canvas,
  });

  let interval = setInterval(() => {
    bacteria.update((TICK_RATE * 5) / 1000);
    bacteria.checkBoundaryCollision();
  }, TICK_RATE);

  let animationFrame: number;

  const testVec = vec2(1, 2);
  console.log(testVec);
  const loop = () => {
    setupLab(ctx);
    bacteria.draw();
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

const lab6 = (ctx: CanvasRenderingContext2D) => {
  setupLab(ctx);
  const { canvas } = ctx;

  const bacterias = new Array(10).fill(0).map((_, index) => {
    return new Bacteria(
      vec2(50 + index * 30, 100 + index * 30),
      vec2(25, index * 2),
      vec2(0, 0),
      { radius: 25 - index, color: colors[index % colors.length], canvas }
    );
  });

  let interval = setInterval(() => {
    bacterias.forEach((bacteria) => {
      bacteria.update((TICK_RATE * 5) / 1000);
      bacteria.checkBoundaryCollision();
      bacterias.forEach((otherBacteria) => {
        if (bacteria !== otherBacteria) {
          bacteria.checkOtherCollision(otherBacteria);
        }
      });
    });
  }, TICK_RATE);

  let animationFrame: number;

  const testVec = vec2(1, 2);
  console.log(testVec);
  const loop = () => {
    setupLab(ctx);
    bacterias.forEach((bacteria) => bacteria.draw());
    animationFrame = requestAnimationFrame(loop);
  };

  animationFrame = requestAnimationFrame(loop);

  // drag n drop
  let selectedBacteria: Bacteria;
  let isDragging = false;
  let dragStart: vec2;
  let dragOffset: vec2;
  let dragStartTime = performance.now();

  // performance problems with not removing event listeners
  canvas.addEventListener("mousedown", (e) => {
    const { x, y } = e;
    const { left, top } = canvas.getBoundingClientRect();
    const mousePosition = new vec2(x - left, y - top);
    bacterias.forEach((bacteria) => {
      if (bacteria.isInside(mousePosition)) {
        isDragging = true;
        selectedBacteria = bacteria;
        dragStart = bacteria.position;
        dragOffset = bacteria.position.subtract(mousePosition);
        dragStartTime = performance.now();
        bacteria.velocity = new vec2(0, 0);
      }
    });
  });

  canvas.addEventListener("mousemove", (e) => {
    if (isDragging) {
      const { x, y } = e;
      const { left, top } = canvas.getBoundingClientRect();
      const mousePosition = new vec2(x - left, y - top);
      selectedBacteria!.position = dragOffset.add(mousePosition);
    }
  });

  canvas.addEventListener("mouseup", (e) => {
    if (isDragging) {
      const { x, y } = e;
      const { left, top } = canvas.getBoundingClientRect();
      const mousePosition = new vec2(x - left, y - top);
      const distance = mousePosition.subtract(dragStart);
      const dragEndTime = performance.now();
      const dragDuration = (dragEndTime - dragStartTime) / 1000;
      selectedBacteria!.velocity = distance.multiply(1 / dragDuration);
      isDragging = false;
    }
  });

  canvas.addEventListener("mouseleave", (e) => {
    if (isDragging) {
      const { x, y } = e;
      const { left, top } = canvas.getBoundingClientRect();
      const mousePosition = new vec2(x - left, y - top);
      const distance = mousePosition.subtract(dragStart);
      const dragEndTime = performance.now();
      const dragDuration = (dragEndTime - dragStartTime) / 1000;
      selectedBacteria!.velocity = distance.multiply(1 / dragDuration);
      isDragging = false;
    }
  });

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

export { lab6 };
