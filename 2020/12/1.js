import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => input.trim().split('\n').map(line => {
    const matches = line.match(/^(?<action>[A-Z])(?<value>\d+)$/);
    if (matches) {
        const { groups: { action, value } } = matches;
        return {
            action,
            value: parseInt(value, 10)
        };
    }
    else {
        throw new Error(line);
    }
});

const calcManhattanDistance = (p2, p1 = { x: 0, y: 0 }) => Math.abs(p2.x - p1.x) + Math.abs(p2.y - p1.y);

const SETTINGS = {
    'E': { dir: 'x', mod:  1, angle:   0 },
    'W': { dir: 'x', mod: -1, angle: 180 },
    'S': { dir: 'y', mod: -1, angle:  90 },
    'N': { dir: 'y', mod:  1, angle: 270 },
    'L': -1,
    'R':  1,
    0: 'E',
    90: 'S',
    180: 'W',
    270: 'N'
};

const doInstruction = (ship, { action, value }) => {
    let move;

    switch(action) {
        case 'N':
        case 'S':
        case 'E':
        case 'W':
            move = SETTINGS[action];
            ship[move.dir] += (move.mod * value);
            break;
        case 'L':
        case 'R':
            move = SETTINGS[ship.facing].angle + (SETTINGS[action] * value);
            if (move >= 360) {
                move = move % 360;
            }
            if (move < 0) {
                move = 360 + move;
            }
            ship.facing = SETTINGS[move];
            break;
        case 'F':
            move = SETTINGS[ship.facing];
            ship[move.dir] += (move.mod * value);
            break;
        default:
            break;
    }
};

const calcSolution = input => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);

    const ship = {
        x: 0,
        y: 0,
        facing: 'E'
    };

    parsedInput.forEach(instruction => doInstruction(ship, instruction));

    return calcManhattanDistance(ship);
};

const tests = [
    {
        inp: `
F10
N3
F7
R90
F11
`,
        out: 25
    }
];

tests.forEach(({ inp, out }) => {
    const res = calcSolution(inp);
    if (res === out) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

console.log(calcSolution(input));
