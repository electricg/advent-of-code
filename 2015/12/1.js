import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => JSON.parse(input);

const recursiveCalc = (obj, sum = 0) => {
    if (typeof obj === 'number') {
        sum += obj;
    }
    else if (Array.isArray(obj)) {
        obj.forEach(item => {
            sum += recursiveCalc(item);
        });
    }
    else if (typeof obj === 'object') {
        const keys = Object.keys(obj);
        keys.forEach(key => {
            sum += recursiveCalc(obj[key]);
        });
    }

    return sum;
}

const calcSolution = input => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);
    return recursiveCalc(parsedInput);
};

const tests = [
    {
        inp: '[1,2,3]',
        out: 6
    },
    {
        inp: '{"a":2,"b":4}',
        out: 6
    },
    {
        inp: '[[[3]]]',
        out: 3
    },
    {
        inp: '{"a":{"b":4},"c":-1}',
        out: 3
    },
    {
        inp: '{"a":[-1,1]}',
        out: 0
    },
    {
        inp: '[-1,{"a":1}]',
        out: 0
    },
    {
        inp: '{}',
        out: 0
    },
    {
        inp: '[]',
        out: 0
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
