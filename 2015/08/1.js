import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);
const inputTest = Helpers.readFile('./input_test.txt', import.meta.url);

const calcSolution = input => input.slice(0, -1).split('\n').reduce((sum, string) => sum + string.length - eval(string).length, 0);

const tests = [
    {
        inp: inputTest,
        out: 12
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