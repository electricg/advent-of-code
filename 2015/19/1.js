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

// console.log(replaceAtIndex('XxabcdeXxfghijkXx', 'Xx', 'Yy', 7));
// console.log(replaceAtIndex('XxabcdeXxfghijkXx', 'Xx', 'Yy', 0));

const calcSolution = input => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);
    const { formulas, molecule } = parsedInput;
    const res = new Set();
    const formulasKeys = Object.keys(formulas);

    formulasKeys.forEach(key => {
        const currentFormulas = formulas[key];
        let findIndex = 0;
        while(findIndex !== -1) {
            findIndex = molecule.indexOf(key, findIndex);
            if (findIndex !== -1) {
                currentFormulas.forEach(formula => {
                    const txt = replaceAtIndex(molecule, key, formula, findIndex);
                    res.add(txt);
                });
                findIndex++;
            }
        }
    });

    return res.size;
};

const tests = [
    {
        inp: `
H => HO
H => OH
O => HH

HOH
`,
        out: 4
    },
    {
        inp: `
H => HO
H => OH
O => HH

HOHOHO
`,
        out: 7
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
