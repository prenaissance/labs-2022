import { setupLab1 } from "../utils/setup";

const task1 = (ctx: CanvasRenderingContext2D) => {
    setupLab1(ctx);
    ctx.fillStyle = "#000";
    ctx.lineWidth = 2;

    let rx = 150, ry = 185;
    const { width, height } = ctx.canvas;
    const x = width / 2 - rx;
    const y = height / 2 - ry;

    ctx.save();

    ctx.translate(x, y);
    // draw rectangle part
    ctx.strokeRect(0, 0, rx * 2, ry * 2);
    ctx.beginPath();
    ctx.moveTo(rx, 0);
    ctx.lineTo(rx, ry * 2);
    ctx.moveTo(0, ry);
    ctx.lineTo(rx * 2, ry);
    // draw cross part
    ctx.moveTo(0, 0);
    ctx.lineTo(rx * 2, ry * 2);
    ctx.moveTo(rx * 2, 0);
    ctx.lineTo(0, ry * 2);

    ctx.stroke();

    // draw arc part
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#f66";
    ctx.beginPath();
    ctx.arc(rx, ry, rx, -Math.PI / 4, -Math.PI, true);
    ctx.stroke();

    // draw chord part
    ctx.fillStyle = "#25b";
    ctx.beginPath();
    ctx.arc(rx, ry, rx, -Math.PI / 4, -Math.PI * 3 / 4, true);
    ctx.closePath();
    ctx.fill();

    //draw "pie" part
    rx -= 7;
    ctx.translate(7, 0);
    ctx.fillStyle = "#8fb";
    ctx.beginPath();
    ctx.arc(rx, ry, rx, Math.PI, Math.PI / 4, true);
    ctx.lineTo(rx, ry);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
};

const task2 = (ctx: CanvasRenderingContext2D) => {
    setupLab1(ctx);

    const gradient = ctx.createLinearGradient(0, 0, 400, 400);
    gradient.addColorStop(0, "#ccf");
    gradient.addColorStop(1, "#aaf");

    const squareRectal = (x: number, y: number, size: number, count: number) => {
        if (!count) {
            return;
        }

        ctx.fillStyle = "#88f";
        ctx.fillRect(x, y, size, size);
        ctx.fillStyle = gradient;
        ctx.fillRect(x + size / 3, y + size / 3, size / 3, size / 3);

        setTimeout(() => {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (i !== 1 || j !== 1) {
                        squareRectal(x + size / 3 * i, y + size / 3 * j, size / 3, count - 1)
                    }
                }
            }
        }, 500);

    };
    const { width, height } = ctx.canvas;
    const size = Math.min(width, height);
    squareRectal(10, 10, size - 20, 5);
};

export {
    task1,
    task2
};