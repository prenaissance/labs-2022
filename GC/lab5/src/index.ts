import "./style.scss";
import { task1, task2, task3 } from "./tasks/lab5";
import { setupLab } from "./utils/setup";

const container = document.querySelector(".grid-container")!;
const canvas: HTMLCanvasElement = document.querySelector("#canvas")!;
canvas.height = 400;
canvas.width = 400;
const ctx = canvas.getContext("2d", { alpha: true })!;
const task1Button: HTMLButtonElement = document.querySelector("#task-1")!;
const task2Button: HTMLButtonElement = document.querySelector("#task-2")!;
const task3Button: HTMLButtonElement = document.querySelector("#task-3")!;

setupLab(ctx);

task1Button.addEventListener("click", () => task1(ctx));
task2Button.addEventListener("click", () => task2(ctx));
task3Button.addEventListener("click", () => task3(ctx));
