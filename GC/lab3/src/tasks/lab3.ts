import vert from "common/shaders/default.vert";
import frag from "common/shaders/default.frag";
import lightVert from "common/shaders/light.vert";
import lightFrag from "common/shaders/light.frag";
import kObj from "common/shapes/k.obj";
import { createProgram, createShader } from "common/utils/shaderUtils";
import monkeyObj from "common/shapes/monki.obj";
import Camera from "camera/Camera";
import { parseObj, parseObjIndexed } from "common/utils/objUtils";

const k = parseObj(kObj);
const monkey = parseObjIndexed(monkeyObj);
const container = document.querySelector(".grid-container")!;
const canvas: HTMLCanvasElement = document.querySelector("#gl-canvas")!;
const gl = canvas.getContext("webgl2", { alpha: true })!;

let fov = Math.PI / 2.5;
const f = 1 / Math.tan(fov / 2);
let aspect = (gl?.canvas?.clientWidth || 1) / (gl?.canvas?.clientHeight || 1);
const near = 0.1;
const far = 5;

const camera = new Camera(new DOMPoint(0, 0, -2));
const projectionMatrix = new DOMMatrix(
    [
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, 1, 1,
        0, 0, 0, 1
    ]
);

let perspectiveMatrix = new DOMMatrix();

const { width, height } = gl.canvas;
gl.viewport(0, 0, width, height);

// gl.enable(gl.CULL_FACE);
// gl.cullFace(gl.FRONT);
gl.enable(gl.DEPTH_TEST);

let animationFrame: number;

const cancelAnimation = () => cancelAnimationFrame(animationFrame);

const task1 = (gl: WebGL2RenderingContext) => {
    const modelMatrix = new DOMMatrix(
        [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]
    );

    // modelMatrix.translateSelf(...k.center);
    modelMatrix.translateSelf(0, 0, +25);
    modelMatrix.scale3dSelf(0.5);


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
    // color
    const colorAttributeLocation = gl.getAttribLocation(program, "a_color");
    gl.vertexAttrib4fv(colorAttributeLocation, [0.39, 0.12, 0.33, 1]);
    // model matrix

    const main = () => {
        gl.useProgram(program);

        gl.clearColor(0.9, 1, 1, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        modelMatrix.translateSelf(...k.center);
        modelMatrix.rotateSelf(-1, 0.1, 1.5);
        modelMatrix.translateSelf(...k.center.map(x => -x));

        const viewMatrixLocation = gl.getUniformLocation(program, "uViewMatrix");
        const projectionMatrixLocation = gl.getUniformLocation(program, "uProjectionMatrix");
        const perspectiveMatrixLocation = gl.getUniformLocation(program, "uPerspectiveMatrix");
        const lightDirectionLocation = gl.getUniformLocation(program, "uLightDirection");

        const modelMatrixAttributeLocation = gl.getAttribLocation(program, "a_modelMatrix");
        gl.vertexAttrib4fv(modelMatrixAttributeLocation, modelMatrix.toFloat32Array().slice(0, 4));
        gl.vertexAttrib4fv(modelMatrixAttributeLocation + 1, modelMatrix.toFloat32Array().slice(4, 8));
        gl.vertexAttrib4fv(modelMatrixAttributeLocation + 2, modelMatrix.toFloat32Array().slice(8, 12));
        gl.vertexAttrib4fv(modelMatrixAttributeLocation + 3, modelMatrix.toFloat32Array().slice(12, 16));

        gl.uniformMatrix4fv(viewMatrixLocation, false, camera.viewMatrix.toFloat32Array());
        gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix.toFloat32Array());
        gl.uniformMatrix4fv(perspectiveMatrixLocation, false, perspectiveMatrix.toFloat32Array());
        gl.uniform3fv(lightDirectionLocation, new Float32Array([-0.1, -1, -0.1]));

        gl.drawArrays(gl.TRIANGLES, 0, k.position.length / 3);
        animationFrame = requestAnimationFrame(main);
    };
    return main();
};

const task2 = (gl: WebGL2RenderingContext) => {
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, lightVert)!;
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, lightFrag)!;
    const program = createProgram(gl, vertexShader, fragmentShader)!;

    const modelMatrices = new Array(4).fill(0).map((_, i) => {
        const modelMatrix = new DOMMatrix();
        modelMatrix.scale3dSelf(0.05);
        modelMatrix.translateSelf(0, 0, 65);
        return modelMatrix.translateSelf(-75 + i * 50, 0, 0);
    });

    // position 
    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    const positionBuffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(monkey.vertices), gl.STATIC_DRAW);

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

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(monkey.normals), gl.STATIC_DRAW);

    gl.enableVertexAttribArray(normalAttributeLocation);
    gl.vertexAttribPointer(
        normalAttributeLocation,
        3,
        gl.FLOAT,
        false, 0, 0
    );

    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    // indices

    const indexBuffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(monkey.indices), gl.STATIC_DRAW);

    // colors
    const colors = [
        [0.39, 0.12, 0.33, 1],
        [0.39, 0.22, 0.43, 1],
        [0.39, 0.32, 0.53, 1],
        [0.39, 0.42, 0.63, 1],
    ];
    const colorAttributeLocation = gl.getAttribLocation(program, "a_color");
    const colorBuffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors.flat()), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(colorAttributeLocation);
    gl.vertexAttribPointer(
        colorAttributeLocation,
        4,
        gl.FLOAT,
        false, 0, 0
    );
    gl.vertexAttribDivisor(colorAttributeLocation, 1);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    // model matrices

    const modelMatrixAttributeLocation = gl.getAttribLocation(program, "a_modelMatrix");
    const modelMatrixBuffer = gl.createBuffer()!;
    const bytesPerMatrix = 16 * 4;
    gl.bindBuffer(gl.ARRAY_BUFFER, modelMatrixBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, bytesPerMatrix * modelMatrices.length, gl.DYNAMIC_DRAW);
    for (let i = 0; i < 4; i++) {
        gl.bufferSubData(gl.ARRAY_BUFFER, i * bytesPerMatrix, modelMatrices[i].toFloat32Array());
        gl.enableVertexAttribArray(modelMatrixAttributeLocation + i);
        gl.vertexAttribPointer(
            modelMatrixAttributeLocation + i,
            4,
            gl.FLOAT,
            false,
            bytesPerMatrix,
            i * 4 * 4
        );
        gl.vertexAttribDivisor(modelMatrixAttributeLocation + i, 1);
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    const main = () => {
        gl.useProgram(program);

        gl.clearColor(0.9, 1, 1, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        const modelMatrixAttributeLocation = gl.getAttribLocation(program, "a_modelMatrix");
        //rotate monkeys
        modelMatrices.forEach((modelMatrix, i) => {
            modelMatrix.translateSelf(...monkey.center);
            modelMatrix.rotateSelf(1 * (i + 1), 0, 1);
            modelMatrix.translateSelf(...monkey.center.map(x => -x));
        });
        gl.bindBuffer(gl.ARRAY_BUFFER, modelMatrixBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, bytesPerMatrix * modelMatrices.length, gl.DYNAMIC_DRAW);
        for (let i = 0; i < 4; i++) {
            gl.bufferSubData(gl.ARRAY_BUFFER, i * bytesPerMatrix, modelMatrices[i].toFloat32Array());
            gl.enableVertexAttribArray(modelMatrixAttributeLocation + i);
            gl.vertexAttribPointer(
                modelMatrixAttributeLocation + i,
                4,
                gl.FLOAT,
                false,
                bytesPerMatrix,
                i * 4 * 4
            );
            gl.vertexAttribDivisor(modelMatrixAttributeLocation + i, 1);
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, null);



        const viewMatrixLocation = gl.getUniformLocation(program, "uViewMatrix");
        const projectionMatrixLocation = gl.getUniformLocation(program, "uProjectionMatrix");
        const perspectiveMatrixLocation = gl.getUniformLocation(program, "uPerspectiveMatrix");
        const lightDirectionLocation = gl.getUniformLocation(program, "uLightDirection");



        gl.uniformMatrix4fv(viewMatrixLocation, false, camera.viewMatrix.toFloat32Array());
        gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix.toFloat32Array());
        gl.uniformMatrix4fv(perspectiveMatrixLocation, false, perspectiveMatrix.toFloat32Array());
        gl.uniform3fv(lightDirectionLocation, new Float32Array([-0.1, -1, -0.1]));

        gl.drawElementsInstanced(gl.TRIANGLES, monkey.indices.length, gl.UNSIGNED_SHORT, 0, 4);
        animationFrame = requestAnimationFrame(main);
    };
    return main();

};

export { task1, cancelAnimation, task2 };