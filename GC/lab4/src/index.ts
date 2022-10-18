import "./style.scss";
import { task0, task1, task2 } from "./tasks/lab4";
import { setupLab } from "./utils/setup";

const container = document.querySelector(".grid-container")!;
const canvas: HTMLCanvasElement = document.querySelector("#canvas")!;
canvas.height = 400;
canvas.width = 400;
const ctx = canvas.getContext("2d", { alpha: true })!;
const clearButton: HTMLButtonElement = document.querySelector("#clear")!;
const task0Button: HTMLButtonElement = document.querySelector("#task-0")!;
const task1Button: HTMLButtonElement = document.querySelector("#task-1")!;
const task2Button: HTMLButtonElement = document.querySelector("#task-2")!;

setupLab(ctx);

clearButton.addEventListener("click", () => setupLab(ctx));
task0Button.addEventListener("click", () => task0(ctx));
task1Button.addEventListener("click", () => task1(ctx));
task2Button.addEventListener("click", () => task2(ctx));
