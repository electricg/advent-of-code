import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => {
    const [formulas, molecule] = input.trim().split('\n\n');
    const parsedFormulas = formulas.trim().split('\n').reduce((acc, line) => {
        const [from, to] = line.split(/\s*=>\s*/);
        if (!acc[from]) {
            acc[from] = [];
        }
        acc[from].push(to);
        return acc;
    }, {});
    return {
        formulas: parsedFormulas,
        molecule
    };
};

const replaceAtIndex = (string, find, replace, index) => {
    return `${string.slice(0, index)}${replace}${string.slice(index + find.length)}`;
};

const getMinSteps = (data, start, end) => {
    let minSteps = 0;
    const formulasKeys = Object.keys(formulas);
    const formulasKeysLen = formulasKeys.length;

    for (let i = 0; i < formulasKeysLen; i++) {
        
    }

    return minSteps;
};

const calcSolution = (input, start) => {
    const parsedInput = parseInput(input);
    console.log(parsedInput);
    const { formulas, molecule } = parsedInput;
    const minD = getMinSteps(formulas, start, molecule);
};

const tests = [
    {
        inp: `
e => H
e => O
H => HO
H => OH
O => HH

HOH
`,
        out: 3,
        start: 'e'
    },
    {
        inp: `
e => H
e => O
H => HO
H => OH
O => HH

HOHOHO
`,
        out: 6,
        start: 'e'
    }
];

tests.forEach(({ inp, out, start }) => {
    const res = calcSolution(inp, start);
    if (res === out) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

// console.log(calcSolution(input, 'e'));
