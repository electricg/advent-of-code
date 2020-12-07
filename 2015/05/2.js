import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFileLines(fileName, import.meta.url);

const calcProp1 = input => {
    const len = input.length - 3;
    for (let i = 0; i < len; i++) {
        const searchTerm = input.substr(i, 2);
        const where = input.substr(i + 2);
        if (where.indexOf(searchTerm) !== -1) {
            return true;
        }
    }
    return false;
};

const calcProp2 = input => {
    const len = input.length - 2;
    for (let i = 0; i < len; i++) {
        if (input[i] === input[i + 2]) {
            return true;
        }
    }
    return false;
};

const isNice = string => {
    const hasProp1 = calcProp1(string);
    const hasProp2 = calcProp2(string);
    return hasProp1 && hasProp2;
};

const calcSolution = (input = []) => input.filter(isNice).length;

const tests = [
    {
        inp: 'qjhvhtzxzqqjkmpb',
        out: true
    },
    {
        inp: 'xxyxx',
        out: true
    },
    {
        inp: 'uurcxstgmygtbstg',
        out: false
    },
    {
        inp: 'ieodomkazucvgmuy',
        out: false
    }
];

tests.forEach(({ inp, out }) => {
    const res = isNice(inp);
    if (res === out) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

console.log(calcSolution(input));