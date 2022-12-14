
const position = [
    -1.0, -1.0, -1.0, // triangle 1 : begin
    -1.0, -1.0, 1.0,
    -1.0, 1.0, 1.0, // triangle 1 : end
    1.0, 1.0, -1.0, // triangle 2 : begin
    -1.0, -1.0, -1.0,
    -1.0, 1.0, -1.0, // triangle 2 : end
    1.0, -1.0, 1.0,
    -1.0, -1.0, -1.0,
    1.0, -1.0, -1.0,
    1.0, 1.0, -1.0,
    1.0, -1.0, -1.0,
    -1.0, -1.0, -1.0,
    -1.0, -1.0, -1.0,
    -1.0, 1.0, 1.0,
    -1.0, 1.0, -1.0,
    1.0, -1.0, 1.0,
    -1.0, -1.0, 1.0,
    -1.0, -1.0, -1.0,
    -1.0, 1.0, 1.0,
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, -1.0, -1.0,
    1.0, 1.0, -1.0,
    1.0, -1.0, -1.0,
    1.0, 1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, 1.0, -1.0,
    -1.0, 1.0, -1.0,
    1.0, 1.0, 1.0,
    -1.0, 1.0, -1.0,
    -1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0,
    1.0, -1.0, 1.0
];
const normal = [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1];
const texcoord = [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1];
const indices = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23];

const color = [
    1, 0, 0, 1,
    1, 0, 0, 1,
    1, 0, 0, 1,

    0, 1, 0, 1,
    0, 1, 0, 1,
    0, 1, 0, 1,

    0, 0, 1, 1,
    0, 0, 1, 1,
    0, 0, 1, 1,

    0, 1, 0, 1,
    0, 1, 0, 1,
    0, 1, 0, 1,

    1, 0, 0, 1,
    1, 0, 0, 1,
    1, 0, 0, 1,

    0, 0, 1, 1,
    0, 0, 1, 1,
    0, 0, 1, 1,


    1, 0, 1, 1,
    1, 0, 1, 1,
    1, 0, 1, 1,

    1, 1, 0, 1,
    1, 1, 0, 1,
    1, 1, 0, 1,

    1, 1, 0, 1,
    1, 1, 0, 1,
    1, 1, 0, 1,

    0, 1, 1, 1,
    0, 1, 1, 1,
    0, 1, 1, 1,

    0, 1, 1, 1,
    0, 1, 1, 1,
    0, 1, 1, 1,

    1, 0, 1, 1,
    1, 0, 1, 1,
    1, 0, 1, 1,


]


export {
    position,
    normal,
    texcoord,
    indices,
    color
}