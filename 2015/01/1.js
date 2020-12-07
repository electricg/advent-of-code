import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => input.split('');

const calcSolution = input => parseInput(input).reduce((acc, item) => {
    if (item === '(') {
        acc++;
    }
    else if (item === ')') {
        acc--;
    }
    return acc;
}, 0);

const tests = [
    {
        inp: '(())',
        out: 0
    },
    {
        inp: '()()',
        out: 0
    },
    {
        inp: '(((',
        out: 3
    },
    {
        inp: '(()(()(',
        out: 3
    },
    {
        inp: '))(((((',
        out: 3
    },
    {
        inp: '())',
        out: -1
    },
    {
        inp: '))(',
        out: -1
    },
    {
        inp: ')))',
        out: -3
    },
    {
        inp: ')())())',
        out: -3
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