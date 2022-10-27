import "./style.scss";
import { midterm } from "./tasks/midterm";
import { setupLab } from "./utils/setup";

const container = document.querySelector(".grid-container")!;
const canvas: HTMLCanvasElement = document.querySelector("#canvas")!;
canvas.height = 400;
canvas.width = 400;
const ctx = canvas.getContext("2d", { alpha: true })!;
const clearButton: HTMLButtonElement = document.querySelector("#clear")!;
const startButton: HTMLButtonElement = document.querySelector("#start")!;

setupLab(ctx);

clearButton.addEventListener("click", () => setupLab(ctx));
startButton.addEventListener("click", () => midterm(ctx));
