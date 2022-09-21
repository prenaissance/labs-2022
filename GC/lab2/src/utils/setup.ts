const setupLab1 = (ctx: CanvasRenderingContext2D) => {
    const gradient = ctx.createLinearGradient(0, 0, 400, 400);
    gradient.addColorStop(0, "#ccf");
    gradient.addColorStop(1, "#aaf");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 400);
};

export {
    setupLab1
};