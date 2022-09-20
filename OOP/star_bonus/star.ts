const args = process.argv.slice(2);
if (!args) {
    console.log("Usage: node star.js <matrix size>");
}
const N = Number.parseInt(args[0]);

const range = (n1: number, n2?: number) => {
    const start = n2 ? n1 : 0;
    const end = n2 ? n2 : n1;
    const arr: number[] = [];
    for (let i = start; i < end; i++) {
        arr.push(i);
    }

    return arr;
};

/* 
uses following coordinate axis
    |       x
----+------->
    |
    |
   \|/ y
*/
class DrawingBoard {
    private readonly _matrix: string[][] = [];

    constructor(n: number, char = "-") {
        range(n).forEach(() => this._matrix.push(range(n).map(() => char)));
    }

    print() {
        const reduceRow = (row: string[]) => row.reduce((str, char) => str + char, "");
        const str = this._matrix.reduce((str, row) => str + reduceRow(row) + "\n", "");
        console.log(str);
    }

    drawTriangle(startingRow: number, endingRow: number, char = "#") {
        const n = this._matrix.length;
        const dy = endingRow - startingRow;
        const dx = Math.ceil(N / 2);
        let slope = dy / dx;
        // if ()
        let offset = 0;
        let y = startingRow;
        let yi = 1;
        if (startingRow > endingRow) {
            yi = -1;
            slope = -slope;
        }
        // use better algorithm if you want
        while (y != endingRow + yi) {
            const offsetFloor = Math.floor(offset);
            range(0 + offsetFloor, n - offsetFloor).forEach((i) => {
                //validate range to be able to draw triangles outside coordinates
                const isInRange = y >= 0 && y < n && i >= 0 && i < n;
                if (isInRange) {
                    this._matrix[y][i] = char;
                }
            });

            offset += 1 / slope;
            y += yi;
        }

    }
}

const drawingBoard = new DrawingBoard(N, "░░");
drawingBoard.drawTriangle(N - 1, -1, "▓▓");
drawingBoard.drawTriangle(Math.floor(N / 3), Math.floor(N - N / 6), "▓▓");
drawingBoard.drawTriangle(N, Math.floor(N - N / 3), "░░");

drawingBoard.print();