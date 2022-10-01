type GlObject = {
    position: number[],
    normal: number[],
};

const splitLine = (line: string): string[] =>
    line.split(' ')
        .slice(1)
        .filter(x => !x.match(/^\s*$/));

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
    return {
        position: triangles,
        normal: triangleNormals,
    };
};

export { parseObj };