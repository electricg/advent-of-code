import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => Helpers.readStringNumbers(input.trim());

const calcSolution = (input, lastTurn) => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);
    
    const len = parsedInput.length + 1;
    let lastSpoken = parsedInput.pop();
    const spokenNumbers = new Map();
    parsedInput.forEach((item, index) => {
        spokenNumbers.set(item, index + 1);
    });

    for (let i = len; i <= lastTurn; i++) {
        const firstTime = spokenNumbers.get(lastSpoken);
        spokenNumbers.set(lastSpoken, i - 1);
        if (firstTime === undefined) {
            lastSpoken = 0;
        }
        else {
            lastSpoken = i - 1 - firstTime;
        }
    }

    return lastSpoken;
};

const tests = [
    {
        inp: '0,3,6',
        out: 436,
        lastTurn: 2020
    },
    {
        inp: '1,3,2',
        out: 1,
        lastTurn: 2020
    },
    {
        inp: '2,1,3',
        out: 10,
        lastTurn: 2020
    },
    {
        inp: '1,2,3',
        out: 27,
        lastTurn: 2020
    },
    {
        inp: '2,3,1',
        out: 78,
        lastTurn: 2020
    },
    {
        inp: '3,2,1',
        out: 438,
        lastTurn: 2020
    },
    {
        inp: '3,1,2',
        out: 1836,
        lastTurn: 2020
    },
    // {
    //     inp: '0,3,6',
    //     out: 175594,
    //     lastTurn: 30000000
    // },
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

console.log(calcSolution(input, 30000000));
