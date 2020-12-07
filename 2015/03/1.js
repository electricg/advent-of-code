import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => input.trim().split('');

const calcSolution = input => {
    const parsedInput = parseInput(input);
    let x = 0;
    let y = 0;
    const start = {};
    start[`${x}|${y}`] = 1;
    const houses = parsedInput.reduce((acc, move) => {
        switch(move) {
            case '^':
                y++;
                break;
            case 'v':
                y--;
                break;
            case '>':
                x++;
                break;
            case '<':
                x--;
                break;
            default:
                break;
        }

        const key = `${x}|${y}`;
        if (!acc[key]) {
            acc[key] = 0;
        }
        acc[key] += 1;
        return acc;
    }, start);

    return Object.keys(houses).length;
};

const tests = [
    {
        inp: '>',
        out: 2
    },
    {
        inp: '^>v<',
        out: 4
    },
    {
        inp: '^v^v^v^v^v',
        out: 2
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