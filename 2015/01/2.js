import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => input.split('');

const calcSolution = input => {
    const parsedInput = parseInput(input);
    const len = parsedInput.length;
    let floor = 0;
    for (let i = 0; i < len; i++) {
        if (parsedInput[i] === '(') {
            floor++;
        }
        else if (parsedInput[i] === ')') {
            floor--;
        }
        if (floor === -1) {
            return i + 1;
        }
    }
}

const tests = [
    {
        inp: ')',
        out: 1
    },
    {
        inp: '()())',
        out: 5
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