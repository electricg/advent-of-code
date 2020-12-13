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
    'E': { dir: 'x', mod:  1 },
    'W': { dir: 'x', mod: -1 },
    'S': { dir: 'y', mod: -1 },
    'N': { dir: 'y', mod:  1 },
};

const doInstruction = (ship, waypoint, { action, value }) => {
    let move;
    let tempY;

    switch(action) {
        case 'N':
        case 'S':
        case 'E':
        case 'W':
            move = SETTINGS[action];
            waypoint[move.dir] += (move.mod * value);
            break;
        case 'L':
        case 'R':
            if (action === 'L') {
                value = 360 - value;
            }
            if (value === 180) {
                waypoint.x *= -1;
                waypoint.y *= -1;
            }
            else if (value === 90) {
                tempY = waypoint.y;
                waypoint.y = -1 * waypoint.x;
                waypoint.x = tempY;
            }
            else if (value === 270) {
                tempY = waypoint.y;
                waypoint.y = waypoint.x;
                waypoint.x = -1 * tempY;
            }
            break;
        case 'F':
            ship.x += waypoint.x * value;
            ship.y += waypoint.y * value;
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
        y: 0
    };
    const waypoint = {
        x: 10,
        y: 1
    };

    parsedInput.forEach(instruction => doInstruction(ship, waypoint, instruction));

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
        out: 286
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
