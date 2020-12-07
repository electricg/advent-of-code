import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = () => {

};

const calcSolution = () => {

};

const tests = [
    {
        inp: '',
        out: ''
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