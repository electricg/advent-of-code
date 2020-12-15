import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => Helpers.readStringNumbers(input.trim());

const calcSolution = (input, lastTurn) => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);
    let lastSpoken = parsedInput.pop();
    let spokenNumbers = [, ...parsedInput];
    const len = spokenNumbers.length + 1;
    // console.log(spokenNumbers, len, lastSpoken);

    for (let i = len; i <= lastTurn; i++) {
        const firstTime = spokenNumbers.lastIndexOf(lastSpoken);
        spokenNumbers.push(lastSpoken);
        if (firstTime === -1) {
            lastSpoken = 0;
        }
        else {
            lastSpoken = i - 1 - firstTime;
        }
        // console.log(i, spokenNumbers, lastSpoken);
    }

    return lastSpoken;
};

const tests = [
    {
        inp: '0,3,6',
        out: 436,
        lastTurn: 2020
    }
];

tests.forEach(({ inp, lastTurn, out }) => {
    const res = calcSolution(inp, lastTurn);
    if (res === out) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

console.log(calcSolution(input, 2020));
