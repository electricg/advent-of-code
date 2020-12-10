import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => input.trim();

const calcSeries = input => {
    const a = input.split('').reduce((acc, c, index, arr) => {
        if (acc.current.length === 0) {
            acc.current.push(c);
        }
        else {
            if (acc.current[0] === c) {
                acc.current.push(c);
            }
            else {
                acc.res.push(acc.current);
                acc.current = [c];
            }
        }
        if (index === arr.length - 1) {
            acc.res.push(acc.current);
            acc.current = [];
        }
        return acc;
    }, {current: [], res: []});
    // console.log(a);
    return a.res.map(group => `${group.length}${group[0]}`).join('');
};

const calcSolution = (input, iterations) => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);
    let series = parsedInput;
    for (let i = 0; i < iterations; i++) {
        series = calcSeries(series);
    }
    return series;
};

const tests = [
    {
        inp: '1',
        out: '11',
        iterations: 1
    },
    {
        inp: '11',
        out: '21',
        iterations: 1
    },
    {
        inp: '21',
        out: '1211',
        iterations: 1
    },
    {
        inp: '1211',
        out: '111221',
        iterations: 1
    },
    {
        inp: '111221',
        out: '312211',
        iterations: 1
    },
    {
        inp: '1',
        out: '312211',
        iterations: 5
    }
];

tests.forEach(({ inp, out, iterations }) => {
    const res = calcSolution(inp, iterations);
    if (res === out) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

console.log(calcSolution(input, 50).length);