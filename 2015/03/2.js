import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => input.trim().split('');

const calcSolution = input => {
    const parsedInput = parseInput(input);
    const x = { odd: 0, even: 0};
    const y = { odd: 0, even: 0};
    const start = {};
    start['0|0'] = 2;
    const houses = parsedInput.reduce((acc, move, i) => {
        const who = i % 2 === 0 ? 'even' : 'odd';
        switch(move) {
            case '^':
                y[who]++;
                break;
            case 'v':
                y[who]--;
                break;
            case '>':
                x[who]++;
                break;
            case '<':
                x[who]--;
                break;
            default:
                break;
        }

        const key = `${x[who]}|${y[who]}`;
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
        inp: '^v',
        out: 3
    },
    {
        inp: '^>v<',
        out: 3
    },
    {
        inp: '^v^v^v^v^v',
        out: 11
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