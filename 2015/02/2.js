import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => input.trim().split('\n').map(line => line.split('x').map(item => parseInt(item, 10)));

const calcSolution = input => {
    const parsedInput = parseInput(input);
    return parsedInput.reduce((acc, item) => {
        const [d1, d2, d3] = item;
        const volume = d1 * d2 * d3;
        const sideA = d1 + d2;
        const sideB = d1 + d3;
        const sideC = d2 + d3;
        const smallestSide = Math.min(sideA, sideB, sideC);
        const paper = smallestSide * 2 + volume;
        return acc += paper;
    }, 0);
};

const tests = [
    {
        inp: '2x3x4',
        out: 34
    },
    {
        inp: '1x1x10',
        out: 14
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