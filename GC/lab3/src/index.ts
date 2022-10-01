import "./style.scss";
import vert from "./common/shaders/default.vert";
import frag from "./common/shaders/default.frag";
import lightVert from "./common/shaders/light.vert";
import lightFrag from "./common/shaders/light.frag";
import kObj from "./common/shapes/k.obj";
import manObj from "./common/shapes/man.obj";
import monkiObj from "./common/shapes/monki.obj";
import cubeObj from "./common/shapes/cube.obj";
import { createProgram, createShader } from "./common/utils/shaderUtils";
import * as cube from "./common/shapes/cube";
import Camera from "./camera/Camera";
import { parseObj } from "./common/utils/objUtils";

const k = parseObj(kObj);
const container = document.querySelector(".grid-container")!;
const canvas: HTMLCanvasElement = document.querySelector("#gl-canvas")!;
const gl = canvas.getContext("webgl2", { alpha: true })!;

let fov = Math.PI / 2.5;
const f = 1 / Math.tan(fov / 2);
let aspect = (gl?.canvas?.clientWidth || 1) / (gl?.canvas?.clientHeight || 1);
const near = 0.2;
const far = 5;

const camera = new Camera(new DOMPoint(0, 0, -2));

const modelMatrix = new DOMMatrix(
    [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]
);

modelMatrix.scale3dSelf(0.1);
modelMatrix.translateSelf(0, 0, -3);


if (!gl) {
    alert("no webgl2 :(");
}

const { width, height } = gl.canvas;

const projectionMatrix = new DOMMatrix(
    [
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, 1, 1,
        0, 0, 0, 1
    ]
);


let perspectiveMatrix = new DOMMatrix();

const vertexShader = createShader(gl, gl.VERTEX_SHADER, lightVert)!;
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, lightFrag)!;
const program = createProgram(gl, vertexShader, fragmentShader)!;

// position 
const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
const positionBuffer = gl.createBuffer()!;
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(k.position), gl.STATIC_DRAW);

gl.enableVertexAttribArray(positionAttributeLocation);
gl.vertexAttribPointer(
    positionAttributeLocation,
    3,
    gl.FLOAT,
    false, 0, 0
);

gl.bindBuffer(gl.ARRAY_BUFFER, null);

// normal
const normalAttributeLocation = gl.getAttribLocation(program, "a_normal");
const normalBuffer = gl.createBuffer()!;
gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(k.normal), gl.STATIC_DRAW);

gl.enableVertexAttribArray(normalAttributeLocation);
gl.vertexAttribPointer(
    normalAttributeLocation,
    3,
    gl.FLOAT,
    false, 0, 0
);

gl.bindBuffer(gl.ARRAY_BUFFER, null);


gl.viewport(0, 0, width, height);
gl.clearColor(0, 0, 13, 0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
gl.useProgram(program);

gl.enable(gl.CULL_FACE);
gl.cullFace(gl.FRONT);
gl.enable(gl.DEPTH_TEST);


const main = () => {
    modelMatrix.translateSelf(1, -1, 0);
    modelMatrix.rotateSelf(-1, 0.1, 1.5);
    modelMatrix.translateSelf(-1, 1, 0);

    const modelMatrixLocation = gl.getUniformLocation(program, "uModelMatrix");
    const viewMatrixLocation = gl.getUniformLocation(program, "uViewMatrix");
    const projectionMatrixLocation = gl.getUniformLocation(program, "uProjectionMatrix");
    const perspectiveMatrixLocation = gl.getUniformLocation(program, "uPerspectiveMatrix");
    const lightDirectionLocation = gl.getUniformLocation(program, "uLightDirection");

    gl.uniformMatrix4fv(modelMatrixLocation, false, modelMatrix.toFloat32Array());
    gl.uniformMatrix4fv(viewMatrixLocation, false, camera.viewMatrix.toFloat32Array());
    gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix.toFloat32Array());
    gl.uniformMatrix4fv(perspectiveMatrixLocation, false, perspectiveMatrix.toFloat32Array());
    gl.uniform3fv(lightDirectionLocation, new Float32Array([-1, -0.5, 0.1]));

    gl.drawArrays(gl.TRIANGLES, 0, k.position.length / 3);
    requestAnimationFrame(main);
};


requestAnimationFrame(main);
