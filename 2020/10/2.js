import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);
const inputTest1 = Helpers.readFile('./input_test1.txt', import.meta.url);
const inputTest2 = Helpers.readFile('./input_test2.txt', import.meta.url);

const parseInput = input => input.trim().split('\n').map(line => parseInt(line, 10));

const calcSolution = input => {
    const parsedInput = parseInput(input);
    parsedInput.sort(Helpers.compareNumbers);
    // console.log(parsedInput);
    const len = parsedInput.length;

    let ways = [];
    ways[len - 1] = 1;
    for (let i = len - 2; i >= 0; i--) {
        let sum = 0;
        for (let diff = 1; diff <= 3; diff++) {
            const pos = parsedInput.indexOf(parsedInput[i] + diff);
            if (pos !== -1) {
                sum += ways[pos];
            }
        }
        ways[i] = sum;
    }
    let res = 0;
    // console.log('ways', ways);
    for (let v = 1; v <= 3; v++) {
        const pos = parsedInput.indexOf(v);
        if (pos !== -1) {
            res += ways[pos];
        }
    }
    return res;
};

const tests = [
    {
        inp: inputTest1,
        out: 8
    },
    {
        inp: inputTest2,
        out: 19208
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

// console.log(calcSolution(input));
