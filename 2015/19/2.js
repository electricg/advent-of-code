import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => {
    const [formulas, molecule] = input.trim().split('\n\n');
    const parsedFormulas = formulas.trim().split('\n').reduce((acc, line) => {
        const [to, from] = line.split(/\s*=>\s*/);
        acc[from] = to;
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

const sortByLength = (a, b) => b.length - a.length; 

const calcSolution = (input, start) => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);
    const { formulas, molecule } = parsedInput;
    const sortedKeys = Object.keys(formulas).sort(sortByLength);

    let target = molecule;
    let res = 0;

    while (target !== start) {
        for (const key of sortedKeys) {
            if (target.includes(key)) {
                target = target.replaceAll(key, (match, offset, str) => {
                    res++;
                    return formulas[match];
                })
                // console.log(target);
                break;
            }
        }
    }
    return res;
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

console.log(calcSolution(input, 'e'));
