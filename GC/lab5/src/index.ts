import "./style.scss";
import { task1 } from "./tasks/lab5";
import { setupLab } from "./utils/setup";

const container = document.querySelector(".grid-container")!;
const canvas: HTMLCanvasElement = document.querySelector("#canvas")!;
canvas.height = 400;
canvas.width = 400;
const ctx = canvas.getContext("2d", { alpha: true })!;
const task1Button: HTMLButtonElement = document.querySelector("#task-1")!;

setupLab(ctx);

task1Button.addEventListener("click", () => task1(ctx));
