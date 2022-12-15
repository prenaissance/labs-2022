import "./style.scss";
import { lab6 } from "./tasks/lab6";
import { setupLab } from "./utils/setup";

const canvas: HTMLCanvasElement = document.querySelector("#canvas")!;
canvas.height = 400;
canvas.width = 400;
const ctx = canvas.getContext("2d", { alpha: true })!;
const lab6button: HTMLButtonElement = document.querySelector("#lab-6")!;

setupLab(ctx);

lab6button.addEventListener("click", () => lab6(ctx));
