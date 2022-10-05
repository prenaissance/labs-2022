type GlObject = {
    position: number[],
    normal: number[],
    center: number[],
    sizes: number[]
};

type IndexedObjectElement = {
    vertices: number[],
    normals: number[],
    indices: number[],
    center: number[],
    sizes: number[],
};

const splitLine = (line: string): string[] =>
    line.split(' ')
        .slice(1)
        .filter(x => !x.match(/^\s*$/));

const getSizes = (vertices: number[][]) => {
    const mins = [Infinity, Infinity, Infinity];
    const maxs = [-Infinity, -Infinity, -Infinity];
    for (let i = 0; i < vertices.length; i++) {
        for (let j = 0; j < 3; j++) {
            mins[j] = Math.min(mins[j], vertices[i][j]);
            maxs[j] = Math.max(maxs[j], vertices[i][j]);
        }
    }
    const center = [0, 1, 2].map(i => (mins[i] + maxs[i]) / 2);
    const sizes = [0, 1, 2].map(i => maxs[i] - mins[i]);

    return {
        center,
        sizes
    };
};

const normalize = (v: number[]) => {
    const len = Math.sqrt(v.map(x => x * x).reduce((a, b) => a + b, 0));
    return v.map(x => x / len);
};

const getVertexNormal = (vertex: number[], center: number[]) => {
    const v = vertex.map((x, i) => x - center[i]);
    return normalize(v);
};

const parseObj = (source: string): GlObject => {
    const lines = source.split(/\r?\n/);

    const vertexStrings = lines.filter(line => line.startsWith('v '));
    const vertexNormalStrings = lines.filter(line => line.startsWith('vn '));
    const faceStrings = lines.filter(line => line.startsWith('f '));

    const vertices = vertexStrings.map(line => splitLine(line).map(parseFloat));
    const vertexNormals = vertexNormalStrings.map(line => splitLine(line).map(parseFloat));
    const faces = faceStrings.map(line => splitLine(line).map(s => s.split('/').map(i => parseInt(i) - 1)));

    const vertexIndices = faces.map(face => face.map(f => f[0]));
    const vertexNormalIndices = faces.map(face => face.map(f => f[2]));

    const triangles: number[] = [];
    const triangleNormals: number[] = [];

    for (let i = 0; i < vertexIndices.length; i++) {

        const face = vertexIndices[i];
        const faceNormals = vertexNormalIndices[i];
        for (let j = 1; j < face.length - 1; j++) {
            triangles.push(...vertices[face[0]]);
            triangles.push(...vertices[face[j]]);
            triangles.push(...vertices[face[j + 1]]);

            triangleNormals.push(...vertexNormals[faceNormals[0]]);
            triangleNormals.push(...vertexNormals[faceNormals[j]]);
            triangleNormals.push(...vertexNormals[faceNormals[j + 1]]);
        }

    }

    const mins = [Infinity, Infinity, Infinity];
    const maxs = [-Infinity, -Infinity, -Infinity];
    for (let i = 0; i < vertices.length; i++) {
        for (let j = 0; j < 3; j++) {
            mins[j] = Math.min(mins[j], vertices[i][j]);
            maxs[j] = Math.max(maxs[j], vertices[i][j]);
        }
    }

    return {
        position: triangles,
        normal: triangleNormals,
        ...getSizes(vertices)
    };
};

const parseObjIndexed = (source: string): IndexedObjectElement => {
    const lines = source.split(/\r?\n/);

    const vertexStrings = lines.filter(line => line.startsWith('v '));
    const vertexNormalStrings = lines.filter(line => line.startsWith('vn '));
    const faceStrings = lines.filter(line => line.startsWith('f '));

    //map vertices and normals one to one to match indices
    const vertices = vertexStrings.map(line => splitLine(line).map(parseFloat));
    const vertexNormals = vertexNormalStrings.map(line => splitLine(line).map(parseFloat));
    const faces = faceStrings.map(line => splitLine(line).map(s => s.split('/').map(i => parseInt(i) - 1)));

    const indices: number[] = [];
    const normals: number[][] = new Array(vertices.length).fill(0).map(() => [0, 0, 0]);

    const vertexIndices = faces.map(face => face.map(f => f[0]));
    const normalIndices = faces.map(face => face.map(f => f[2]));
    const { center, sizes } = getSizes(vertices);

    for (let i = 0; i < vertexIndices.length; i++) {
        const face = vertexIndices[i];
        const faceNormals = normalIndices[i];

        for (let j = 1; j < face.length - 1; j++) {
            indices.push(face[0], face[j], face[j + 1]);
            normals[face[0]] = vertexNormals[faceNormals[0]];
            normals[face[j]] = vertexNormals[faceNormals[j]];
            normals[face[j + 1]] = vertexNormals[faceNormals[j + 1]];
        }
    }

    return {
        vertices: vertices.flat(),
        normals: normals.flat(),
        indices,
        center,
        sizes
    };
};

export { parseObj, parseObjIndexed };