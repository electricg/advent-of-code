import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => input.trim().split('\n');

const solvePlus = expression => {
    while(expression.indexOf('+') !== -1) {
        expression = expression.replace(/\d+ \+ \d+/, match => eval(match));
    }
    return eval(expression);
}

const calcExpression = expression => {
    while(expression.indexOf('(') !== -1) {
        expression = expression.replace(/\([\d \+\*]+\)/, match => solvePlus(match));
    }
    return solvePlus(expression);
};

const calcSolution = input => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);
    const res = parsedInput.reduce((acc, line) => {
        return acc += calcExpression(line);
    }, 0);
    // console.log(res);
    return res;
};

const tests = [
    {
        inp: '1 + 2 * 3 + 4 * 5 + 6',
        out: 231
    },
    {
        inp: '1 + (2 * 3) + (4 * (5 + 6))',
        out: 51
    },
    {
        inp: '2 * 3 + (4 * 5)',
        out: 46
    },
    {
        inp: '5 + (8 * 3 + 9 + 3 * 4 * 3)',
        out: 1445
    },
    {
        inp: '5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))',
        out: 669060
    },
    {
        inp: '((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2',
        out: 23340
    }
];

tests.forEach(({ inp, out }) => {
    const res = calcExpression(inp);
    if (res === out) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

console.log(calcSolution(input));
