import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => input.trim().split('\n');

const parseExpression = expression => {
    return expression.replace(/\(/g, '( ').replace(/\)/g, ' )').split(' ');
};

const calcExpression = (expression = []) => {
    let a = '';
    while (expression.length) {
        const current = expression.shift();

        if (current === '(') {
            const tmp = calcExpression(expression);
            expression = tmp.string;
            a = `${a} ${tmp.res}`;
            a = eval(a);
        }
        else if (current === ')') {
            a = eval(a);
            return { res: a, string: expression };
        }
        else if (current === '*' || current === '+') {
            a = `${a} ${current}`;
        }
        else {
            a = `${a} ${current}`;
            a = eval(a);
        }
    }
    return { res: a, string: expression };
};

const calcSolution = input => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);
    const res = parsedInput.reduce((acc, line) => {
        const exp = parseExpression(line);
        return acc += calcExpression(exp).res;
    }, 0);
    // console.log(res);
    return res;
};

const tests = [
    {
        inp: '1 + 2 * 3 + 4 * 5 + 6',
        out: 71
    },
    {
        inp: '1 + (2 * 3) + (4 * (5 + 6))',
        out: 51
    },
    {
        inp: '2 * 3 + (4 * 5)',
        out: 26
    },
    {
        inp: '5 + (8 * 3 + 9 + 3 * 4 * 3)',
        out: 437
    },
    {
        inp: '5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))',
        out: 12240
    },
    {
        inp: '((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2',
        out: 13632
    }
];

tests.forEach(({ inp, out }) => {
    const res = calcExpression(parseExpression(inp));
    if (res.res === out) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

console.log(calcSolution(input));
