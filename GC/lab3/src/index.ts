import { cancelAnimation, task1, task2 } from "./tasks/lab3";
import "./style.scss";

const container = document.querySelector(".grid-container")!;
const canvas: HTMLCanvasElement = document.querySelector("#gl-canvas")!;
const gl = canvas.getContext("webgl2", { alpha: true })!;

if (!gl) {
    alert("no webgl2 :(");
}
gl.clearColor(0.9, 1, 1, 1);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

let animationFrame: number;

const clearButton = document.querySelector("#clear") as HTMLButtonElement;
const task1Button = document.querySelector("#task-1") as HTMLButtonElement;
const task2Button = document.querySelector("#task-2") as HTMLButtonElement;

clearButton.addEventListener("click", () => {
    cancelAnimation();
    gl.clearColor(0.9, 1, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
});

task1Button.addEventListener("click", () => {
    cancelAnimation();
    requestAnimationFrame(() => task1(gl));
    console.log(animationFrame);
});

task2Button.addEventListener("click", () => {
    cancelAnimation();
    requestAnimationFrame(() => task2(gl));
    console.log(animationFrame);
});