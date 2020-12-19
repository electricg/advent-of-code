import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => input.trim().split('\n');

const run = line => {

};

const calcExpression = expression => {
    let a = '';
    while (expression.length) {
        let spaceIndex = expression.indexOf(' ');
        if (spaceIndex === -1) {
            spaceIndex = expression.length;
        }
        const current = expression.slice(0, spaceIndex);
        const first = current[0];
        const last = current[current.length - 1];
        expression = expression.slice(spaceIndex + 1);
        // console.log(current, `_${expression}_`, a);

        if (first === '(') {
            const tmp = calcExpression(`${current.slice(1)} ${expression}`);
            expression = tmp.string;
            a = `${a} ${tmp.res}`;
            a = eval(a);
        }
        else if (last === ')') {
            const firstP = current.indexOf(')');
            a = `${a} ${current.slice(0, firstP)}`
            a = eval(a);
            return { res: a, string: `${current.slice(firstP + 1)} ${expression}`};
        }
        else if (first === '*' || first === '+') {
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
        return acc += calcExpression(line).res;
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
    const res = calcExpression(inp);
    if (res.res === out) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

console.log(calcSolution(input));
