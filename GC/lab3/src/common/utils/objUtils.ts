type GlObject = {
    position: number[],
    normal: number[],
};

const parse = (source: string): GlObject => {
    const lines = source.split(/\r?\n/);
    const positionStrings = lines.filter(line => line.startsWith('v '));
    const normalStrings = lines.filter(line => line.startsWith('vn '));
    const position = positionStrings.map(line => line.split(' ').slice(1).map(parseFloat)).flat();
    const normal = normalStrings.map(line => line.split(' ').slice(1).map(parseFloat)).flat();
    console.log(position);
    return {
        position,
        normal,
    };
};

export { parse };