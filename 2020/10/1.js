import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);
const inputTest1 = Helpers.readFile('./input_test1.txt', import.meta.url);
const inputTest2 = Helpers.readFile('./input_test2.txt', import.meta.url);

const parseInput = input => input.trim().split('\n').map(line => parseInt(line, 10));

const calcSolution = input => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);
    parsedInput.sort(Helpers.compareNumbers).unshift(0);
    const len = parsedInput.length - 1;
    const differences = {};

    for (let i = 0; i < len; i++) {
        const diff = parsedInput[i + 1] - parsedInput[i];
        if (differences[diff] === undefined) {
            differences[diff] = 0;
        }
        differences[diff]++;
    }
    differences[3]++;
    console.log(differences);
    return differences[1] * differences[3];
};

const tests = [
    {
        inp: inputTest1,
        out: 35
    },
    {
        inp: inputTest2,
        out: 220
    }
]

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
