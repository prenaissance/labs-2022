const setupLab = (ctx: CanvasRenderingContext2D) => {
  const gradient = ctx.createLinearGradient(0, 0, 400, 400);
  gradient.addColorStop(0, "#ccf");
  gradient.addColorStop(1, "#aaf");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 400, 400);

  // fill the right half with orange yellow radial gradient

  const radialGradient = ctx.createRadialGradient(200, 200, 0, 200, 200, 200);
  radialGradient.addColorStop(0, "#ff0");
  radialGradient.addColorStop(1, "#f80");
  ctx.fillStyle = radialGradient;
  ctx.fillRect(200, 0, 200, 400);
};

export { setupLab };
