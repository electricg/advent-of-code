import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInstructions = txt => txt.trim().split('\n').map(line => line.trim().split(',').map(item => [item.substr(0,1), parseInt(item.substr(1), 10)]));

const calcManhattanDistance = (p2, p1 = {x:0,y:0}) => Math.abs(p2.x - p1.x) + Math.abs(p2.y - p1.y);

const calcPath = (instruction = []) => {
    let x = 0;
    let y = 0;

    return instruction.reduce((path, [dir, steps]) => {
        // console.log(dir, steps);
        switch(dir) {
            case 'U':
                for (let i = 0; i < steps; i++) {
                    y++;
                    path[`${x}|${y}`] = { x, y };
                }
                break;
            case 'D':
                for (let i = 0; i < steps; i++) {
                    y--;
                    path[`${x}|${y}`] = { x, y };
                }
                break;
            case 'L':
                for (let i = 0; i < steps; i++) {
                    x--;
                    path[`${x}|${y}`] = { x, y };
                }
                break;
            case 'R':
                for (let i = 0; i < steps; i++) {
                    x++;
                    path[`${x}|${y}`] = { x, y };
                }
                break;
            default:
                break;
        }

        return path;
    }, {});
};

const findIntersections = (path1, path2) => {
    const keys2 = Object.keys(path2);
    return keys2.filter(key => path1[key]);
};

const calcDistance = (instructions) => {
    const parsedInstructions = parseInstructions(instructions);
    const [path1, path2] = parsedInstructions.map(calcPath);
    const intersections = findIntersections(path1, path2);
    const distances = intersections.map(key => calcManhattanDistance(path1[key]));

    return Math.min(...distances);
};

const tests = [
    {
        inp: `
R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83
`,
        out: 159
    },
    {
        inp: `
R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7
`,
        out: 135
    }
];

tests.forEach(({ inp, out }) => {
    const res = calcDistance(inp);
    if (res === out) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

console.log(calcDistance(input));