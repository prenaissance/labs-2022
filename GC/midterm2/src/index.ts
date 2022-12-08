import "./style.scss";
import { midterm } from "./tasks/midterm";
import { setupLab } from "./utils/setup";

const canvas: HTMLCanvasElement = document.querySelector("#canvas")!;
canvas.height = 400;
canvas.width = 400;
const ctx = canvas.getContext("2d", { alpha: true })!;
const midtermButton: HTMLButtonElement = document.querySelector("#midterm")!;

setupLab(ctx);

midtermButton.addEventListener("click", () => midterm(ctx));
